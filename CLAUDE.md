# Monedin App — Instrucciones para Claude

## Stack

- **Framework**: React + TanStack Router (file-based routing)
- **Estilos**: Tailwind CSS v4 + shadcn/ui (Base UI primitives)
- **Estado servidor**: TanStack Query
- **Estado cliente**: Zustand con `persist` middleware
- **Auth**: Better Auth con plugin `usernameClient`
- **Backend**: Supabase
- **Package manager**: `pnpm`

---

## Arquitectura de carpetas

```
src/
├── components/
│   ├── layout/          ← layouts estructurales (ParentLayout, ChildLayout, AuthLayout, AppSidebar)
│   └── ui/              ← primitivos shadcn/ui únicamente
├── constants/           ← constantes globales (usadas en múltiples features)
│   ├── app.constants.ts      APP_NAME, STORAGE_KEYS
│   ├── routes.constants.ts   ROUTES
│   ├── roles.constants.ts    enum FamilyRole
│   ├── query.constants.ts    queryKeys
│   ├── ui.constants.ts       SELECT_NONE_VALUE
│   └── index.ts              barrel export
├── features/
│   └── [feature]/
│       ├── api.ts
│       ├── types.ts
│       ├── schemas.ts
│       ├── constants.ts      ← constantes SOLO de esta feature
│       ├── hooks/
│       ├── components/
│       └── pages/            ← componentes de página (un archivo por ruta)
├── lib/
│   ├── auth/client.ts
│   └── query/
├── routes/              ← solo configuración de rutas, sin lógica UI
└── store/               ← stores Zustand
```

---

## Reglas de routing

Las rutas son **solo configuración**. No contienen JSX ni lógica UI:

```tsx
// ✅ Correcto
export const Route = createFileRoute('/_parent/dashboard')({
  component: DashboardPage,
})

// ❌ Incorrecto — JSX en la ruta
export const Route = createFileRoute('/_parent/dashboard')({
  component: () => <div>...</div>,
})
```

Los layouts viven en `src/components/layout/`. Los guards (`beforeLoad`) sí van en la ruta.

**Layouts pathless:**
- `_auth` → `AuthLayout` — rutas de autenticación
- `_parent` → `ParentLayout` + guard (redirige a `/child` si es hijo)
- `_child` → `ChildLayout` + guard (redirige a `/dashboard` si es padre)

---

## Reglas de constantes

**Global** (`src/constants/`) → usada en más de una feature o en components/layout:
- `APP_NAME`, `ROUTES`, `FamilyRole`, `queryKeys`, `SELECT_NONE_VALUE`

**Por feature** (`src/features/[name]/constants.ts`) → solo usada dentro de esa feature:
- `TASK_STATUS_LABELS`, `TASK_STATUS_CLASSES`, `COINS` → en `features/tasks/constants.ts`
- `CHILD_AGE` → en `features/children/constants.ts`

Nunca hardcodear rutas, strings repetidos ni magic numbers. Siempre usar la constante.

---

## Componentes UI

**Siempre usar shadcn/ui.** Nunca elementos HTML nativos cuando existe equivalente shadcn.

Instalar si falta:
```bash
pnpm dlx shadcn@latest add <component>
```

Esta versión de shadcn usa **Base UI** como primitivo (no Radix). Diferencias importantes:
- `DropdownMenuTrigger` no acepta `asChild` — usar `className` directamente
- `DropdownMenuLabel` debe estar dentro de `DropdownMenuGroup`
- `Separator` tiene `data-horizontal:w-full` hardcodeado — si se necesita con margen, usar `<div className="mx-4 h-px bg-border" />` en su lugar

---

## Sistema de colores y diseño

```css
--primary: oklch(0.76 0.13 210)       /* cyan #0BC5EA */
--brand-green: oklch(0.69 0.14 155)   /* verde #48BB78 */
--gradient-brand: linear-gradient(135deg, var(--primary) 0%, var(--brand-green) 100%)
```

**Reglas de uso:**
- `--primary` → texto (`text-primary`), bordes (`border-primary`), opacidades (`primary/20`), sombras
- `--gradient-brand` → backgrounds de elementos destacados (botones CTA, item activo del sidebar, logo)
- `--primary` NO puede ser un gradiente — CSS no lo soporta en contextos de color

**Clases de utilidad ya definidas:**
- `.btn-brand` → botón con `var(--gradient-brand)` de fondo, texto blanco
- `.animate-float-slow` / `.animate-float-fast` → solo para la pantalla de auth, nunca en el área del padre

**Tailwind v4 — sintaxis `!important`:**
```tsx
// ✅ v4: sufijo !
'bg-primary! text-white!'

// ❌ v3: prefijo !
'!bg-primary !text-white'
```

---

## Roles y autenticación

```ts
enum FamilyRole {
  PARENT = 'PARENT',
  CHILD  = 'CHILD',
}
```

- Padres se autentican con email + password
- Hijos se autentican con username + password (plugin `usernameClient`)
- `getFamilyRole(user)` → retorna `FamilyRole` desde los metadatos del usuario

---

## Estado global

| Store | Propósito |
|---|---|
| `useChildStore` | Hijo activo seleccionado por el padre, persiste en localStorage |
| `useUIStore` | Estado de dialogs abiertos (`openCreateChild`, `openCreateTask`) |

---

## Convenciones de código

- Archivos de componentes: `PascalCase.tsx`
- Archivos de hooks, utils, stores: `camelCase.ts`
- Constantes exportadas: `UPPER_SNAKE_CASE`
- Sin comentarios obvios — solo donde la lógica no es evidente
- Sin manejo de errores especulativo — solo en boundaries reales
- Sin abstracciones prematuras — si algo se usa una vez, no extraer
- Importar desde `@/constants` (barrel), nunca desde el archivo individual

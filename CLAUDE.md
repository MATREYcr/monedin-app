# Monedin App — Instrucciones para Claude

## Componentes UI

**Siempre usar shadcn/ui.** Si el componente shadcn necesario no está instalado, instalarlo con:

```bash
pnpm dlx shadcn@latest add <component>
```

Nunca usar elementos HTML nativos (`<select>`, `<input>` sin wrapper, etc.) cuando existe un componente shadcn equivalente. Esto aplica a todos los contextos: forms, dialogs, sidebars, tablas, etc.

import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { ChevronDown, ClipboardList, Home, LogOut, Users } from 'lucide-react'
import { signOut, useSession } from '@/lib/auth/client'
import { useChildStore } from '@/store/child.store'
import { useChildren } from '@/features/children/hooks/useChildren'
import { APP_NAME, ROUTES } from '@/constants'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

const NAV_LINKS: { to: string; label: string; icon: LucideIcon }[] = [
  { to: ROUTES.DASHBOARD, label: 'Inicio', icon: Home },
  { to: ROUTES.CHILDREN, label: 'Hijos', icon: Users },
  { to: ROUTES.TASKS, label: 'Tareas', icon: ClipboardList },
]

function SidebarDivider({ className }: { className?: string }) {
  return (
    <div className={cn('mx-4 h-px bg-sidebar-border group-data-[collapsible=icon]:hidden', className)} />
  )
}

function NavItem({ to, label, icon: Icon }: { to: string; label: string; icon: LucideIcon }) {
  const { location } = useRouterState()
  const isActive = location.pathname === to

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        tooltip={label}
        size="lg"
        render={<Link to={to} />}
        className={cn(
          'text-base! [&_svg]:size-5!',
          'group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2! group-data-[collapsible=icon]:w-10! group-data-[collapsible=icon]:mx-auto',
          isActive && '[background:var(--gradient-brand)]! text-white! hover:opacity-90!',
        )}
      >
        <Icon />
        <span className="group-data-[collapsible=icon]:hidden">{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function AppSidebar() {
  const navigate = useNavigate()
  const { data: session } = useSession()
  const { activeChild, setActiveChild, clearActiveChild } = useChildStore()
  const { data: children } = useChildren()

  async function handleSignOut() {
    await signOut({ fetchOptions: { onSuccess: () => navigate({ to: ROUTES.SIGN_IN }) } })
  }

  return (
    <Sidebar collapsible="icon">

      <SidebarHeader className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary to-brand-green text-base font-bold text-white">
            M
          </div>
          <span className="text-lg font-bold bg-linear-to-r from-primary to-brand-green bg-clip-text text-transparent group-data-[collapsible=icon]:hidden">
            {APP_NAME}
          </span>
        </div>
      </SidebarHeader>

      <SidebarDivider />

      <SidebarContent className="gap-0">

        {/* Selector de hijo activo */}
        <SidebarGroup className="py-3">
          <SidebarGroupLabel className="mb-1 text-[10px] uppercase tracking-wider">
            Viendo a
          </SidebarGroupLabel>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left outline-none transition-colors hover:bg-sidebar-accent',
                'group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2',
              )}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-brand-green/20 text-xl leading-none">
                {activeChild?.avatar ?? '🧒'}
              </div>
              <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                <p className="truncate text-sm font-semibold">
                  {activeChild?.user.name ?? 'Sin selección'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activeChild ? `@${activeChild.user.username}` : 'Selecciona un hijo'}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-52">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Cambiar hijo</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearActiveChild}>
                  <span className="text-base">👤</span>
                  Sin selección
                </DropdownMenuItem>
                {children?.map((child) => (
                  <DropdownMenuItem key={child.id} onClick={() => setActiveChild(child)}>
                    <span className="text-base">{child.avatar ?? '🧒'}</span>
                    {child.user.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarGroup>

        <SidebarDivider />

        {/* Navegación principal */}
        <SidebarGroup className="px-3 py-3">
          <SidebarGroupLabel className="mb-1 text-[10px] uppercase tracking-wider">
            Navegación
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1 group-data-[collapsible=icon]:items-center">
            {NAV_LINKS.map(({ to, label, icon }) => (
              <NavItem key={to} to={to} label={label} icon={icon} />
            ))}
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter className="py-3">
        <SidebarDivider className="mb-3" />
        <div className="flex items-center gap-3 px-3 pb-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-brand-green/20 text-sm font-bold text-primary">
            {session?.user.name?.charAt(0).toUpperCase() ?? '?'}
          </div>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold">{session?.user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{session?.user.email}</p>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="Cerrar sesión" onClick={handleSignOut}>
              <LogOut />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

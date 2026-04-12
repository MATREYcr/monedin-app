import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { ClipboardList, Home, LogOut, Users } from 'lucide-react'
import { signOut, useSession } from '@/lib/auth/client'
import { useChildStore } from '@/store/child.store'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

const navLinks: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/dashboard', label: 'Inicio', icon: Home },
  { to: '/children', label: 'Mis hijos', icon: Users },
  { to: '/tasks', label: 'Tareas', icon: ClipboardList },
]

function NavItem({ to, label, icon: Icon }: { to: string; label: string; icon: LucideIcon }) {
  const { location } = useRouterState()
  const isActive = location.pathname === to

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} tooltip={label} render={<Link to={to} />}>
        <Icon />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function AppSidebar() {
  const navigate = useNavigate()
  const { data: session } = useSession()
  const activeChild = useChildStore((s) => s.activeChild)

  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => navigate({ to: '/sign-in' }),
      },
    })
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center px-2 py-1">
          <span className="font-bold text-base group-data-[collapsible=icon]:hidden">Monedín</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Hijo activo */}
        <SidebarGroup>
          <div className="mx-2 rounded-xl border bg-muted/50 px-3 py-2">
            <p className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
              Viendo a
            </p>
            {activeChild ? (
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-lg leading-none group-data-[collapsible=icon]:text-base">
                  {activeChild.avatar ?? '🧒'}
                </span>
                <span className="text-sm font-semibold truncate group-data-[collapsible=icon]:hidden">
                  {activeChild.user.name}
                </span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground/60 group-data-[collapsible=icon]:hidden">
                Sin selección
              </p>
            )}
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu>
            {navLinks.map(({ to, label, icon }) => (
              <NavItem key={to} to={to} label={label} icon={icon} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="px-2 py-1 group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium truncate">{session?.user.name}</p>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Cerrar sesión" onClick={handleSignOut}>
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

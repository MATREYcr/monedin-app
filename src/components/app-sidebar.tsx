import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { Home, LogOut, Users } from 'lucide-react'
import { signOut, useSession } from '@/lib/auth/client'
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

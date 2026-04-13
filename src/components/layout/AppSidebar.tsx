import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { ClipboardList, Home, LogOut, Users } from 'lucide-react'
import { signOut, useSession } from '@/lib/auth/client'
import { useChildStore } from '@/store/child.store'
import { useChildren } from '@/features/children/hooks/useChildren'
import { APP_NAME, ROUTES, SELECT_NONE_VALUE } from '@/constants'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
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

const NAV_LINKS: { to: string; label: string; icon: LucideIcon }[] = [
  { to: ROUTES.DASHBOARD, label: 'Inicio', icon: Home },
  { to: ROUTES.CHILDREN, label: 'Mis hijos', icon: Users },
  { to: ROUTES.TASKS, label: 'Tareas', icon: ClipboardList },
]

function NavItem({ to, label, icon: Icon }: { to: string; label: string; icon: LucideIcon }) {
  const { location } = useRouterState()

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={location.pathname === to}
        tooltip={label}
        render={<Link to={to} />}
      >
        <Icon />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function AppSidebar() {
  const navigate = useNavigate()
  const { data: session } = useSession()
  const { activeChild, setActiveChild, clearActiveChild } = useChildStore()
  const { data: children } = useChildren()

  function handleChildChange(value: string | null) {
    const child = children?.find((c) => c.id === value)
    if (child) setActiveChild(child)
    else clearActiveChild()
  }

  async function handleSignOut() {
    await signOut({ fetchOptions: { onSuccess: () => navigate({ to: ROUTES.SIGN_IN }) } })
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center px-2 py-1">
          <span className="font-bold text-base group-data-[collapsible=icon]:hidden">{APP_NAME}</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <div className="mx-2 rounded-xl border bg-muted/50 px-3 py-2">
            {/* Colapsado */}
            <div className="hidden group-data-[collapsible=icon]:flex justify-center">
              <span className="text-lg">{activeChild?.avatar ?? '🧒'}</span>
            </div>

            {/* Expandido */}
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-xs text-muted-foreground mb-1">Viendo a</p>
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none shrink-0">
                  {activeChild?.avatar ?? '🧒'}
                </span>
                <Select value={activeChild?.id ?? SELECT_NONE_VALUE} onValueChange={handleChildChange}>
                  <SelectTrigger className="flex-1 h-7 text-sm font-semibold border-none shadow-none bg-transparent px-1 focus:ring-0">
                    <span className="truncate">{activeChild?.user.name ?? 'Sin selección'}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={SELECT_NONE_VALUE}>Sin selección</SelectItem>
                    {children?.map((child) => (
                      <SelectItem key={child.id} value={child.id}>
                        {child.user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu>
            {NAV_LINKS.map(({ to, label, icon }) => (
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

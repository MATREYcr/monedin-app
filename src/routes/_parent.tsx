import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { authClient, getFamilyRole } from '@/lib/auth/client'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export const Route = createFileRoute('/_parent')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (!session) throw redirect({ to: '/sign-in' })
    if (getFamilyRole(session.user) === 'CHILD') throw redirect({ to: '/child' })
  },
  component: ParentLayout,
})

function ParentLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center border-b px-4">
          <SidebarTrigger />
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

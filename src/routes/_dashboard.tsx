import { createFileRoute, redirect, Outlet, useNavigate } from '@tanstack/react-router'
import { authClient, signOut, useSession } from '@/lib/auth/client'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_dashboard')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (!session) {
      throw redirect({ to: '/sign-in' })
    }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
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
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="text-lg font-bold">Monedín</span>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm">{session?.user.name}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

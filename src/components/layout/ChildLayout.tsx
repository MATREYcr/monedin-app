import { Outlet, useNavigate } from '@tanstack/react-router'
import { signOut, useSession } from '@/lib/auth/client'
import { APP_NAME, ROUTES } from '@/constants'
import { Button } from '@/components/ui/button'

export function ChildLayout() {
  const navigate = useNavigate()
  const { data: session } = useSession()

  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => navigate({ to: ROUTES.SIGN_IN }),
      },
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <span className="text-lg font-bold">{APP_NAME}</span>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm">{session?.user.name}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { useSession } from '@/lib/auth/client'

export const Route = createFileRoute('/_parent/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">
        Hola, {session?.user.name?.split(' ')[0]} 👋
      </h1>
      <p className="text-muted-foreground">Bienvenido a Monedín</p>
    </div>
  )
}

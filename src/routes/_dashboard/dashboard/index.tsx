import { createFileRoute } from '@tanstack/react-router'
import { useSession } from '@/lib/auth/client'
import { ChildrenList } from '@/features/children/components/ChildrenList'
import { CreateChildDialog } from '@/features/children/components/CreateChildDialog'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/store/ui.store'

export const Route = createFileRoute('/_dashboard/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  const { data: session } = useSession()
  const openCreateChild = useUIStore((s) => s.openCreateChild)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Hola, {session?.user.name?.split(' ')[0]} 👋
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Gestiona a tus hijos y sus monedas
          </p>
        </div>
        <Button onClick={openCreateChild}>+ Agregar hijo</Button>
      </div>

      <ChildrenList />
      <CreateChildDialog />
    </div>
  )
}

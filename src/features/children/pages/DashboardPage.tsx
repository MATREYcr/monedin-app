import { Users } from 'lucide-react'
import { useSession } from '@/lib/auth/client'
import { useChildren } from '@/features/children/hooks/useChildren'
import { ChildCard } from '@/features/children/components/ChildCard'
import { useUIStore } from '@/store/ui.store'
import { useChildStore } from '@/store/child.store'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CreateChildDialog } from '@/features/children/components/CreateChildDialog'

export function DashboardPage() {
  const { data: session } = useSession()
  const { data: children, isLoading } = useChildren()
  const openCreateChild = useUIStore((s) => s.openCreateChild)
  const { activeChild, setActiveChild } = useChildStore()

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">
          Hola, {session?.user.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-muted-foreground">Selecciona un hijo para gestionar su actividad</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Mis hijos</h2>
          <Button size="sm" onClick={openCreateChild}>+ Agregar hijo</Button>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        )}

        {!isLoading && (!children || children.length === 0) && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-12 text-center">
            <Users className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm font-medium text-muted-foreground">Aún no tienes hijos registrados</p>
            <Button variant="ghost" size="sm" className="mt-2" onClick={openCreateChild}>
              Agregar primer hijo
            </Button>
          </div>
        )}

        {!isLoading && children && children.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {children.map((child) => (
              <ChildCard
                key={child.id}
                child={child}
                isActive={activeChild?.id === child.id}
                onClick={() => setActiveChild(child)}
              />
            ))}
          </div>
        )}
      </div>

      <CreateChildDialog />
    </div>
  )
}

import { useUIStore } from '@/store/ui.store'
import { Button } from '@/components/ui/button'
import { ChildrenList } from '@/features/children/components/ChildrenList'
import { CreateChildDialog } from '@/features/children/components/CreateChildDialog'

export function ChildrenPage() {
  const openCreateChild = useUIStore((s) => s.openCreateChild)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis hijos</h1>
        <Button size="lg" className="btn-brand" onClick={openCreateChild}>+ Agregar hijo</Button>
      </div>
      <ChildrenList />
      <CreateChildDialog />
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { ChildrenList } from '@/features/children/components/ChildrenList'
import { CreateChildDialog } from '@/features/children/components/CreateChildDialog'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/store/ui.store'

export const Route = createFileRoute('/_parent/children/')({
  component: ChildrenPage,
})

function ChildrenPage() {
  const openCreateChild = useUIStore((s) => s.openCreateChild)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis hijos</h1>
        <Button onClick={openCreateChild}>+ Agregar hijo</Button>
      </div>
      <ChildrenList />
      <CreateChildDialog />
    </div>
  )
}

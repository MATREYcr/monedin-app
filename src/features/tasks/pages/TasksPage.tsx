import { useUIStore } from '@/store/ui.store'
import { useChildStore } from '@/store/child.store'
import { Button } from '@/components/ui/button'
import { TaskList } from '@/features/tasks/components/TaskList'
import { CreateTaskDialog } from '@/features/tasks/components/CreateTaskDialog'

export function TasksPage() {
  const openCreateTask = useUIStore((s) => s.openCreateTask)
  const activeChild = useChildStore((s) => s.activeChild)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {activeChild ? `Tareas de ${activeChild.user.name.split(' ')[0]}` : 'Todas las tareas'}
          </h1>
          {activeChild && (
            <p className="text-sm text-muted-foreground">
              Revisa y gestiona las tareas asignadas
            </p>
          )}
        </div>
        <Button onClick={openCreateTask}>+ Nueva tarea</Button>
      </div>

      <TaskList childId={activeChild?.id} />
      <CreateTaskDialog />
    </div>
  )
}

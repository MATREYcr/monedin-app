import { ClipboardList } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useTasks } from '../hooks/useTasks'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  childId?: string
}

export function TaskList({ childId }: TaskListProps) {
  const { data: tasks, isLoading, error } = useTasks(childId)

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-destructive py-8 text-center text-sm">
        Error al cargar las tareas. Intenta de nuevo.
      </div>
    )
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-12 text-center">
        <ClipboardList className="mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm font-medium text-muted-foreground">Sin tareas por aquí</p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          Crea una tarea para que tu hijo la complete
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}

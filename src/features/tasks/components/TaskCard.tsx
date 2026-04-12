import { Coins, Trash2, CheckCircle, XCircle, Calendar } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useApproveTask, useDeleteTask, useRejectTask } from '../hooks/useTaskMutations'
import type { Task, TaskStatus } from '../types'

const STATUS_LABELS: Record<TaskStatus, string> = {
  PENDING: 'Pendiente',
  COMPLETED: 'Por revisar',
  APPROVED: 'Aprobada',
  REJECTED: 'Rechazada',
}

const STATUS_CLASSES: Record<TaskStatus, string> = {
  PENDING: 'bg-muted text-muted-foreground',
  COMPLETED: 'bg-primary/15 text-primary',
  APPROVED: 'bg-brand-green/15 text-brand-green',
  REJECTED: 'bg-destructive/15 text-destructive',
}

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const { mutate: approve, isPending: isApproving } = useApproveTask()
  const { mutate: reject, isPending: isRejecting } = useRejectTask()
  const { mutate: remove, isPending: isDeleting } = useDeleteTask()

  function handleApprove() {
    approve(task.id, {
      onSuccess: () => toast.success(`¡Tarea aprobada! +${task.coins} monedas para ${task.child.user.name}`),
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message ?? 'Error al aprobar la tarea')
        }
      },
    })
  }

  function handleReject() {
    reject(task.id, {
      onSuccess: () => toast.info('Tarea rechazada, vuelve a estado pendiente'),
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message ?? 'Error al rechazar la tarea')
        }
      },
    })
  }

  function handleDelete() {
    remove(task.id, {
      onSuccess: () => toast.success('Tarea eliminada'),
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message ?? 'Error al eliminar la tarea')
        }
      },
    })
  }

  const dueDateFormatted = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('es', { day: 'numeric', month: 'short' })
    : null

  return (
    <Card>
      <CardContent className="py-4 px-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-medium truncate">{task.title}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_CLASSES[task.status]}`}>
                {STATUS_LABELS[task.status]}
              </span>
            </div>

            {task.description && (
              <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{task.description}</p>
            )}

            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
              <span>@{task.child.user.username}</span>
              {dueDateFormatted && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {dueDateFormatted}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-1 font-semibold text-sm">
              <Coins className="h-4 w-4 text-primary" />
              {task.coins}
            </div>

            {task.status === 'PENDING' && (
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}

            {task.status === 'COMPLETED' && (
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs border-destructive/40 text-destructive hover:bg-destructive/10"
                  onClick={handleReject}
                  disabled={isRejecting}
                >
                  <XCircle className="h-3.5 w-3.5 mr-1" />
                  Rechazar
                </Button>
                <Button
                  size="sm"
                  className="h-7 text-xs btn-brand"
                  onClick={handleApprove}
                  disabled={isApproving}
                >
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Aprobar
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

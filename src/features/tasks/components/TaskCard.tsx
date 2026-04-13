import { Coins, Trash2, CheckCircle, XCircle, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useApproveTask, useDeleteTask, useRejectTask } from '../hooks/useTaskMutations'
import { TASK_STATUS_LABELS, TASK_STATUS_CLASSES } from '../constants'
import type { Task } from '../types'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const { mutate: approve, isPending: isApproving } = useApproveTask()
  const { mutate: reject, isPending: isRejecting } = useRejectTask()
  const { mutate: remove, isPending: isDeleting } = useDeleteTask()

  const handleApprove = () => approve(task.id)
  const handleReject = () => reject(task.id)
  const handleDelete = () => remove(task.id)

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
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TASK_STATUS_CLASSES[task.status]}`}>
                {TASK_STATUS_LABELS[task.status]}
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

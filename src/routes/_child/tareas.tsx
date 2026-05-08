import { createFileRoute } from '@tanstack/react-router'
import { ChildTasksPage } from '@/features/tasks/pages/ChildTasksPage'

export const Route = createFileRoute('/_child/tareas')({
  component: ChildTasksPage,
})

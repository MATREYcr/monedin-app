export type TaskStatus = 'PENDING' | 'COMPLETED' | 'APPROVED' | 'REJECTED'

export interface Task {
  id: string
  title: string
  description?: string
  coins: number
  status: TaskStatus
  dueDate?: string
  createdAt: string
  child: {
    id: string
    user: { id: string; name: string; username: string }
  }
}

export interface CreateTaskDto {
  title: string
  description?: string
  coins?: number
  childId: string
  dueDate?: string
}

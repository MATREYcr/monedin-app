import type { TaskStatus } from './types'

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  PENDING: 'Pendiente',
  COMPLETED: 'Por revisar',
  APPROVED: 'Aprobada',
  REJECTED: 'Rechazada',
}

export const TASK_STATUS_CLASSES: Record<TaskStatus, string> = {
  PENDING: 'bg-muted text-muted-foreground',
  COMPLETED: 'bg-primary/15 text-primary',
  APPROVED: 'bg-brand-green/15 text-brand-green',
  REJECTED: 'bg-destructive/15 text-destructive',
}

export const COINS = {
  MAX: 9999,
} as const

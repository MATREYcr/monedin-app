import type { RedemptionStatus } from './types'

export const REDEMPTION_STATUS_LABELS: Record<RedemptionStatus, string> = {
  PENDING: 'Pendiente',
  APPROVED: 'Aprobada',
  REJECTED: 'Rechazada',
}

export const REDEMPTION_STATUS_CLASSES: Record<RedemptionStatus, string> = {
  PENDING: 'bg-primary/15 text-primary',
  APPROVED: 'bg-brand-green/15 text-brand-green',
  REJECTED: 'bg-destructive/15 text-destructive',
}

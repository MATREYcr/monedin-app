import { Coins, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useApproveRedemption, useRejectRedemption } from '../hooks/useRewardMutations'
import { REDEMPTION_STATUS_LABELS, REDEMPTION_STATUS_CLASSES } from '../constants'
import type { Redemption } from '../types'

interface RedemptionCardProps {
  redemption: Redemption
}

export function RedemptionCard({ redemption }: RedemptionCardProps) {
  const { mutate: approve, isPending: isApproving } = useApproveRedemption()
  const { mutate: reject, isPending: isRejecting } = useRejectRedemption()

  const handleApprove = () => approve(redemption.id)
  const handleReject = () => reject(redemption.id)

  return (
    <Card>
      <CardContent className="px-4 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl leading-none">
            🧒
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-medium truncate">{redemption.child.user.name}</p>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${REDEMPTION_STATUS_CLASSES[redemption.status]}`}
              >
                {REDEMPTION_STATUS_LABELS[redemption.status]}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground truncate">
              {redemption.reward.title}
            </p>
            <p className="text-xs text-muted-foreground">@{redemption.child.user.username}</p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-1 text-sm font-semibold">
              <Coins className="h-4 w-4 text-primary" />
              {redemption.reward.coins}
            </div>

            {redemption.status === 'PENDING' && (
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

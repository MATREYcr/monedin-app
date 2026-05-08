import { Gift, Trash2, ToggleLeft, ToggleRight, Coins, Pencil } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/store/ui.store'
import { useDeleteReward, useUpdateReward } from '../hooks/useRewardMutations'
import type { Reward } from '../types'

interface RewardCardProps {
  reward: Reward
}

export function RewardCard({ reward }: RewardCardProps) {
  const { mutate: remove, isPending: isDeleting } = useDeleteReward()
  const { mutate: update, isPending: isToggling } = useUpdateReward()
  const openEditReward = useUIStore((s) => s.openEditReward)

  const handleDelete = () => remove(reward.id)
  const handleToggle = () => update({ id: reward.id, dto: { isActive: !reward.isActive } })
  const handleEdit = () => openEditReward(reward)

  const visibleAssignments = reward.assignments.slice(0, 2)
  const extraCount = reward.assignments.length - 2

  return (
    <Card className="overflow-hidden">
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        {reward.image ? (
          <img
            src={reward.image}
            alt={reward.title}
            className="h-full w-full object-contain p-2"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Gift className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        <span
          className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs font-medium ${
            reward.isActive
              ? 'bg-brand-green/15 text-brand-green'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {reward.isActive ? 'Activa' : 'Inactiva'}
        </span>
      </div>

      <CardContent className="p-3">
        <p className="truncate font-medium">{reward.title}</p>
        {reward.description && (
          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{reward.description}</p>
        )}

        <div className="mt-2 space-y-1">
          {visibleAssignments.map((a) => (
            <div key={a.childId} className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="truncate">
                👤 {a.child?.user.name ?? a.childId}
              </span>
              <span className="flex items-center gap-0.5 font-medium text-foreground shrink-0 ml-2">
                <Coins className="h-3 w-3 text-primary" />
                {a.coins}
              </span>
            </div>
          ))}
          {extraCount > 0 && (
            <p className="text-xs text-muted-foreground/60">y {extraCount} más...</p>
          )}
        </div>

        <div className="mt-3 flex items-center justify-end gap-1.5">
          <Button
            size="icon"
            variant="ghost"
            className={`h-9 w-9 rounded-xl ${reward.isActive ? 'bg-brand-green/15 text-brand-green hover:bg-brand-green/25' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            onClick={handleToggle}
            disabled={isToggling}
            title={reward.isActive ? 'Desactivar' : 'Activar'}
          >
            {reward.isActive ? (
              <ToggleRight className="h-4 w-4" />
            ) : (
              <ToggleLeft className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-xl btn-brand"
            onClick={handleEdit}
            title="Editar"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Eliminar"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

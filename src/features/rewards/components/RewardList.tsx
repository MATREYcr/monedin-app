import { Gift } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useRewards } from '../hooks/useRewards'
import { RewardCard } from './RewardCard'

export function RewardList() {
  const { data: rewards, isLoading, error } = useRewards()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-52 rounded-xl" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8 text-center text-sm text-destructive">
        Error al cargar las recompensas. Intenta de nuevo.
      </div>
    )
  }

  if (!rewards || rewards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-12 text-center">
        <Gift className="mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm font-medium text-muted-foreground">Sin recompensas todavía</p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          Crea recompensas para que tus hijos las canjeen con sus monedas
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {rewards.map((reward) => (
        <RewardCard key={reward.id} reward={reward} />
      ))}
    </div>
  )
}

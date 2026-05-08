import { ClipboardList } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useRedemptions } from '../hooks/useRedemptions'
import { RedemptionCard } from './RedemptionCard'

export function RedemptionList() {
  const { data: redemptions, isLoading, error } = useRedemptions()

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
      <div className="py-8 text-center text-sm text-destructive">
        Error al cargar las solicitudes. Intenta de nuevo.
      </div>
    )
  }

  if (!redemptions || redemptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-12 text-center">
        <ClipboardList className="mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm font-medium text-muted-foreground">Sin solicitudes pendientes</p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          Aquí aparecerán las solicitudes de canje de tus hijos
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {redemptions.map((redemption) => (
        <RedemptionCard key={redemption.id} redemption={redemption} />
      ))}
    </div>
  )
}

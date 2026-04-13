import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import type { ChildProfile } from '../types'

interface ChildCardProps {
  child: ChildProfile
  isActive?: boolean
  onClick?: () => void
}

export function ChildCard({ child, isActive, onClick }: ChildCardProps) {
  return (
    <Card
      className={cn(
        'rounded-2xl transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5',
        isActive && 'ring-2 ring-primary/60 shadow-md shadow-primary/10',
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-brand-green/20 text-xl shrink-0">
          {child.avatar ?? '🧒'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{child.user.name}</p>
          <p className="text-muted-foreground text-sm">@{child.user.username}</p>
          {child.age && (
            <p className="text-muted-foreground text-xs">{child.age} años</p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold text-primary">{child.coins}</p>
          <p className="text-muted-foreground text-xs">monedas</p>
        </div>
      </CardContent>
    </Card>
  )
}

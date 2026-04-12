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
      className={onClick ? 'cursor-pointer transition-shadow hover:shadow-md' : ''}
      onClick={onClick}
      data-active={isActive}
      style={isActive ? { outline: '2px solid var(--primary)', outlineOffset: '2px' } : undefined}
    >
      <CardContent className="flex items-center gap-4 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl">
          {child.avatar ?? '🧒'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{child.user.name}</p>
          <p className="text-muted-foreground text-sm">@{child.user.username}</p>
          {child.age && (
            <p className="text-muted-foreground text-xs">{child.age} años</p>
          )}
        </div>
        <div className="text-right">
          <p className="font-semibold">{child.coins}</p>
          <p className="text-muted-foreground text-xs">monedas</p>
        </div>
      </CardContent>
    </Card>
  )
}

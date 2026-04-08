import { useChildren } from '../hooks/useChildren'
import { ChildCard } from './ChildCard'

export function ChildrenList() {
  const { data: children, isLoading, error } = useChildren()

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-muted h-20 animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-destructive py-8 text-center text-sm">
        Error al cargar los hijos. Intenta de nuevo.
      </div>
    )
  }

  if (!children || children.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground text-4xl">👨‍👧‍👦</p>
        <p className="mt-3 text-sm font-medium">Todavía no tienes hijos registrados</p>
        <p className="text-muted-foreground text-xs mt-1">
          Haz clic en "Agregar hijo" para comenzar
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Mis hijos ({children.length})</h3>
      {children.map((child) => (
        <ChildCard key={child.id} child={child} />
      ))}
    </div>
  )
}

import { useSession } from '@/lib/auth/client'

export function ChildHomePage() {
  const { data: session } = useSession()

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">
        Hola, {session?.user.name} 👋
      </h1>
      <p className="text-muted-foreground">Tu espacio en Monedín</p>
    </div>
  )
}

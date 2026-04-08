import { createFileRoute, Link } from '@tanstack/react-router'
import { SignUpForm } from '@/features/auth/components/SignUpForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/_auth/sign-up')({
  component: SignUpPage,
})

function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Monedín</h1>
          <p className="text-muted-foreground text-sm">Crea tu cuenta de padre</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Crear cuenta</CardTitle>
            <CardDescription>Para padres — los niños son creados desde el dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>

        <p className="text-muted-foreground text-center text-sm">
          ¿Ya tienes cuenta?{' '}
          <Link to="/sign-in" className="text-foreground underline underline-offset-4">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

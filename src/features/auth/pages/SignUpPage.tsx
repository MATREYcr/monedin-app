import { Link } from '@tanstack/react-router'
import { Rocket } from 'lucide-react'
import { ROUTES, APP_NAME } from '@/constants'
import { SignUpForm } from '@/features/auth/components/SignUpForm'

export function SignUpPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-black text-gray-900">¡Únete a {APP_NAME}!</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Crea tu cuenta de padre o madre</p>
      </div>

      <SignUpForm />

      <p className="text-center text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{' '}
        <Link to={ROUTES.SIGN_IN} className="font-medium text-primary underline underline-offset-4">
          Inicia sesión
        </Link>
      </p>
    </div>
  )
}

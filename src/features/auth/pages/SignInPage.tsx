import { Link } from '@tanstack/react-router'
import { Shield, Smile, Zap } from 'lucide-react'
import { ROUTES } from '@/constants'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SignInParentForm } from '@/features/auth/components/SignInParentForm'
import { SignInChildForm } from '@/features/auth/components/SignInChildForm'

export function SignInPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-black text-gray-900">¡Comienza la aventura!</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Selecciona cómo quieres entrar</p>
      </div>

      <Tabs defaultValue="parent">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="parent" className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            Padre / Madre
          </TabsTrigger>
          <TabsTrigger value="child" className="flex items-center gap-1.5">
            <Smile className="h-3.5 w-3.5" />
            Niño
          </TabsTrigger>
        </TabsList>
        <TabsContent value="parent" className="pt-2">
          <SignInParentForm />
        </TabsContent>
        <TabsContent value="child" className="pt-2">
          <SignInChildForm />
        </TabsContent>
      </Tabs>

      <p className="text-center text-sm text-muted-foreground">
        ¿No tienes cuenta?{' '}
        <Link to={ROUTES.SIGN_UP} className="font-medium text-primary underline underline-offset-4">
          Crear cuenta nueva
        </Link>
      </p>
    </div>
  )
}

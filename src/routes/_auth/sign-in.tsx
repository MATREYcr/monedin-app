import { createFileRoute, Link } from '@tanstack/react-router'
import { SignInParentForm } from '@/features/auth/components/SignInParentForm'
import { SignInChildForm } from '@/features/auth/components/SignInChildForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignInPage,
})

function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Monedín</h1>
          <p className="text-muted-foreground text-sm">Inicia sesión en tu cuenta</p>
        </div>

        <Tabs defaultValue="parent">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="parent">Padre / Madre</TabsTrigger>
            <TabsTrigger value="child">Niño</TabsTrigger>
          </TabsList>
          <TabsContent value="parent">
            <Card>
              <CardHeader>
                <CardTitle>Acceso para padres</CardTitle>
                <CardDescription>Usa tu correo y contraseña</CardDescription>
              </CardHeader>
              <CardContent>
                <SignInParentForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="child">
            <Card>
              <CardHeader>
                <CardTitle>Acceso para niños</CardTitle>
                <CardDescription>Usa tu nombre de usuario</CardDescription>
              </CardHeader>
              <CardContent>
                <SignInChildForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="text-muted-foreground text-center text-sm">
          ¿No tienes cuenta?{' '}
          <Link to="/sign-up" className="text-foreground underline underline-offset-4">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}

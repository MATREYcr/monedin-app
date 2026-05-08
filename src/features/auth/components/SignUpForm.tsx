import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { signUp } from '@/lib/auth/client'
import { ROUTES } from '@/constants'
import { signUpSchema, type SignUpValues } from '@/features/auth/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SignUpForm() {
  const navigate = useNavigate()
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '' },
  })

  async function onSubmit(values: SignUpValues) {
    const { error } = await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    })

    if (error) {
      toast.error(error.message ?? 'Error al registrarse')
      return
    }

    toast.success('Cuenta creada correctamente')
    navigate({ to: ROUTES.DASHBOARD })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-sm font-semibold text-foreground">Nombre completo</FormLabel>
              <FormControl>
                <Input placeholder="Juan García" className="h-11 text-base" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-sm font-semibold text-foreground">Correo electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="tu@correo.com" className="h-11 text-base" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-sm font-semibold text-foreground">Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" className="h-11 text-base" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-12 text-base font-bold mt-1 btn-brand"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Creando cuenta...' : 'Crear cuenta →'}
        </Button>
      </form>
    </Form>
  )
}

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { signIn } from '@/lib/auth/client'
import { ROUTES } from '@/constants'
import { signInChildSchema, type SignInChildValues } from '@/features/auth/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SignInChildForm() {
  const navigate = useNavigate()
  const form = useForm<SignInChildValues>({
    resolver: zodResolver(signInChildSchema),
    defaultValues: { username: '', password: '' },
  })

  async function onSubmit(values: SignInChildValues) {
    const { error } = await signIn.username({
      username: values.username,
      password: values.password,
    })

    if (error) {
      toast.error(error.message ?? 'Error al iniciar sesión')
      return
    }

    navigate({ to: ROUTES.DASHBOARD })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-sm font-semibold text-foreground">Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="mi_usuario" className="h-11 text-base" {...field} />
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
                <Input type="password" placeholder="••••" className="h-11 text-base" {...field} />
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
          {form.formState.isSubmitting ? 'Entrando...' : 'Entrar →'}
        </Button>
      </form>
    </Form>
  )
}

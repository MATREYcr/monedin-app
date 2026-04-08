import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { signIn } from '@/lib/auth/client'
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

    navigate({ to: '/dashboard' })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="mi_usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </Form>
  )
}

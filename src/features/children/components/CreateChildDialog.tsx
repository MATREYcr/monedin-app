import { CHILD_AGE } from '../constants'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createChildSchema, type CreateChildValues } from '../schemas'
import { useCreateChild } from '../hooks/useChildMutations'
import { useUIStore } from '@/store/ui.store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function CreateChildDialog() {
  const { createChildOpen, closeCreateChild } = useUIStore()
  const { mutate: createChild, isPending } = useCreateChild()

  const form = useForm<CreateChildValues>({
    resolver: zodResolver(createChildSchema),
    defaultValues: { name: '', username: '', password: '', age: '' },
  })

  function onSubmit(values: CreateChildValues) {
    createChild(
      {
        name: values.name,
        username: values.username,
        password: values.password,
        age: values.age === '' ? undefined : Number(values.age),
      },
      {
        onSuccess: () => {
          form.reset()
          closeCreateChild()
        },
      },
    )
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      form.reset()
      closeCreateChild()
    }
  }

  return (
    <Dialog open={createChildOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar hijo</DialogTitle>
          <DialogDescription>
            Crea una cuenta para tu hijo. Podrá iniciar sesión con su usuario y contraseña.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ana García" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="ana_garcia" {...field} />
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
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad (opcional, {CHILD_AGE.MIN}-{CHILD_AGE.MAX} años)</FormLabel>
                  <FormControl>
                    <Input type="number" min={CHILD_AGE.MIN} max={CHILD_AGE.MAX} placeholder="8" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => handleOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1" disabled={isPending}>
                {isPending ? 'Creando...' : 'Crear hijo'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

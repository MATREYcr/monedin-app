import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUIStore } from '@/store/ui.store'
import { updateChildSchema, type UpdateChildValues } from '../schemas'
import { useUpdateChild } from '../hooks/useChildMutations'
import { CHILD_AGE } from '../constants'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function EditChildDialog() {
  const { editChild, closeEditChild } = useUIStore()
  const { mutate: updateChild, isPending } = useUpdateChild()

  const form = useForm<UpdateChildValues>({
    resolver: zodResolver(updateChildSchema),
    defaultValues: { name: '', age: '', avatar: '' },
  })

  useEffect(() => {
    if (editChild) {
      form.reset({
        name: editChild.user.name,
        age: editChild.age != null ? String(editChild.age) : '',
        avatar: editChild.avatar ?? '',
      })
    }
  }, [editChild, form])

  function onSubmit(values: UpdateChildValues) {
    if (!editChild) return
    updateChild(
      {
        id: editChild.id,
        dto: {
          name: values.name || undefined,
          age: values.age && values.age !== '' ? Number(values.age) : undefined,
          avatar: values.avatar || undefined,
        },
      },
      {
        onSuccess: () => {
          form.reset()
          closeEditChild()
        },
      },
    )
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      form.reset()
      closeEditChild()
    }
  }

  return (
    <Dialog open={!!editChild} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar hijo</DialogTitle>
          <DialogDescription>
            Actualiza el nombre, edad o avatar de {editChild?.user.name}.
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

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar (emoji, opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="🧒" maxLength={2} {...field} />
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
              <Button type="submit" className="flex-1 btn-brand" disabled={isPending}>
                {isPending ? 'Guardando...' : 'Guardar cambios →'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

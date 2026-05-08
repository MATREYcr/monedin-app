import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUIStore } from '@/store/ui.store'
import { updateTaskSchema, type UpdateTaskValues } from '../schemas'
import { useUpdateTask } from '../hooks/useTaskMutations'
import { COINS } from '../constants'
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

export function EditTaskDialog() {
  const { editTask, closeEditTask } = useUIStore()
  const { mutate: updateTask, isPending } = useUpdateTask()

  const form = useForm<UpdateTaskValues>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: { title: '', description: '', coins: '', dueDate: '' },
  })

  useEffect(() => {
    if (editTask) {
      form.reset({
        title: editTask.title,
        description: editTask.description ?? '',
        coins: editTask.coins != null ? String(editTask.coins) : '',
        dueDate: editTask.dueDate ? editTask.dueDate.slice(0, 10) : '',
      })
    }
  }, [editTask, form])

  function onSubmit(values: UpdateTaskValues) {
    if (!editTask) return
    updateTask(
      {
        id: editTask.id,
        dto: {
          title: values.title || undefined,
          description: values.description || undefined,
          coins: values.coins && values.coins !== '' ? Number(values.coins) : undefined,
          dueDate: values.dueDate || undefined,
        },
      },
      {
        onSuccess: () => {
          form.reset()
          closeEditTask()
        },
      },
    )
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      form.reset()
      closeEditTask()
    }
  }

  return (
    <Dialog open={!!editTask} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar tarea</DialogTitle>
          <DialogDescription>
            Modifica los detalles de la tarea. Solo se pueden editar tareas pendientes.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Tender la cama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Detalles de la tarea..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="coins"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monedas</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} max={COINS.MAX} placeholder="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha límite</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

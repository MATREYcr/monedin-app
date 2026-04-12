import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import axios from 'axios'
import { useUIStore } from '@/store/ui.store'
import { useChildStore } from '@/store/child.store'
import { useChildren } from '@/features/children/hooks/useChildren'
import { createTaskSchema, type CreateTaskValues } from '../schemas'
import { useCreateTask } from '../hooks/useTaskMutations'
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

export function CreateTaskDialog() {
  const { createTaskOpen, closeCreateTask } = useUIStore()
  const { mutate: createTask, isPending } = useCreateTask()
  const { data: children } = useChildren()
  const activeChild = useChildStore((s) => s.activeChild)

  const form = useForm<CreateTaskValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      coins: '',
      childId: activeChild?.id ?? '',
      dueDate: '',
    },
  })

  function onSubmit(values: CreateTaskValues) {
    createTask(
      {
        title: values.title,
        description: values.description || undefined,
        coins: values.coins && values.coins !== '' ? Number(values.coins) : undefined,
        childId: values.childId,
        dueDate: values.dueDate || undefined,
      },
      {
        onSuccess: () => {
          toast.success('¡Tarea creada!')
          form.reset()
          closeCreateTask()
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message ?? 'Error al crear la tarea')
          }
        },
      },
    )
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      form.reset({ ...form.formState.defaultValues, childId: activeChild?.id ?? '' })
      closeCreateTask()
    }
  }

  return (
    <Dialog open={createTaskOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nueva tarea</DialogTitle>
          <DialogDescription>
            Asigna una tarea a uno de tus hijos. Al completarla recibirá las monedas indicadas.
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
                      <Input type="number" min={0} max={9999} placeholder="10" {...field} />
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
                    <FormLabel>Fecha límite (opcional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="childId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hijo</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Selecciona un hijo</option>
                      {children?.map((child) => (
                        <option key={child.id} value={child.id}>
                          {child.user.name}
                        </option>
                      ))}
                    </select>
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
                {isPending ? 'Creando...' : 'Crear tarea →'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

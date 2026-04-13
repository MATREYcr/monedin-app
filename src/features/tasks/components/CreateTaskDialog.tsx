import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUIStore } from '@/store/ui.store'
import { useChildStore } from '@/store/child.store'
import { useChildren } from '@/features/children/hooks/useChildren'
import { createTaskSchema, type CreateTaskValues } from '../schemas'
import { useCreateTask } from '../hooks/useTaskMutations'
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
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'

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
          form.reset()
          closeCreateTask()
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
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <span className={field.value ? '' : 'text-muted-foreground'}>
                          {children?.find((c) => c.id === field.value)?.user.name ?? 'Selecciona un hijo'}
                        </span>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {children?.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

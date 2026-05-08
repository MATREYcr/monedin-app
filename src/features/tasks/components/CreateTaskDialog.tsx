import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
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
      dueDate: '',
      assignments: [{ childId: activeChild?.id ?? '', coins: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'assignments',
  })

  function onSubmit(values: CreateTaskValues) {
    createTask(
      {
        title: values.title,
        description: values.description || undefined,
        dueDate: values.dueDate || undefined,
        assignments: values.assignments.map((a) => ({
          childId: a.childId,
          coins: a.coins && a.coins !== '' ? Number(a.coins) : 0,
        })),
      },
      {
        onSuccess: () => {
          form.reset({ title: '', description: '', dueDate: '', assignments: [{ childId: activeChild?.id ?? '', coins: '' }] })
          closeCreateTask()
        },
      },
    )
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      form.reset({ title: '', description: '', dueDate: '', assignments: [{ childId: activeChild?.id ?? '', coins: '' }] })
      closeCreateTask()
    }
  }

  return (
    <Dialog open={createTaskOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nueva tarea</DialogTitle>
          <DialogDescription>
            Asigna una tarea a uno o varios hijos. Cada uno recibirá sus monedas al completarla.
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

            <div className="space-y-2">
              <FormLabel>Hijos y monedas</FormLabel>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <FormField
                    control={form.control}
                    name={`assignments.${index}.childId`}
                    render={({ field: f }) => (
                      <FormItem className="flex-1">
                        <Select value={f.value} onValueChange={f.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <span className={f.value ? '' : 'text-muted-foreground'}>
                                {children?.find((c) => c.id === f.value)?.user.name ?? 'Hijo'}
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

                  <FormField
                    control={form.control}
                    name={`assignments.${index}.coins`}
                    render={({ field: f }) => (
                      <FormItem className="w-24">
                        <FormControl>
                          <Input type="number" min={0} max={COINS.MAX} placeholder="🪙" {...f} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="mt-0.5 h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => append({ childId: '', coins: '' })}
              >
                <Plus className="mr-1 h-4 w-4" />
                Agregar hijo
              </Button>
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
                {isPending ? 'Creando...' : 'Crear tarea →'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

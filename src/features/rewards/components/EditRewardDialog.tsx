import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import { useUIStore } from '@/store/ui.store'
import { useChildren } from '@/features/children/hooks/useChildren'
import { updateRewardSchema, type UpdateRewardValues } from '../schemas'
import { useUpdateReward } from '../hooks/useRewardMutations'
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

export function EditRewardDialog() {
  const { editReward, closeEditReward } = useUIStore()
  const { mutate: updateReward, isPending } = useUpdateReward()
  const { data: children } = useChildren()

  const form = useForm<UpdateRewardValues>({
    resolver: zodResolver(updateRewardSchema),
    defaultValues: { title: '', description: '', image: '', assignments: [] },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'assignments',
  })

  useEffect(() => {
    if (editReward) {
      form.reset({
        title: editReward.title,
        description: editReward.description ?? '',
        image: editReward.image ?? '',
        assignments: editReward.assignments.map((a) => ({
          childId: a.childId,
          coins: String(a.coins),
        })),
      })
    }
  }, [editReward, form])

  function onSubmit(values: UpdateRewardValues) {
    if (!editReward) return
    updateReward(
      {
        id: editReward.id,
        dto: {
          title: values.title || undefined,
          description: values.description || undefined,
          image: values.image || undefined,
          assignments: values.assignments?.map((a) => ({
            childId: a.childId,
            coins: Number(a.coins),
          })),
        },
      },
      {
        onSuccess: () => {
          form.reset()
          closeEditReward()
        },
      },
    )
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      form.reset()
      closeEditReward()
    }
  }

  return (
    <Dialog open={!!editReward} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar recompensa</DialogTitle>
          <DialogDescription>
            Modifica los detalles y asignaciones de {editReward?.title}.
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
                    <Input placeholder="Ej: Helado extra" {...field} />
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
                    <Input placeholder="Detalles de la recompensa..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen (URL, opcional)</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://..." {...field} />
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
                          <Input type="number" min={1} max={9999} placeholder="🪙" {...f} />
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
                {isPending ? 'Guardando...' : 'Guardar cambios →'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

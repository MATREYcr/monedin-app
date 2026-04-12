import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string().min(2, 'Mínimo 2 caracteres').max(100, 'Máximo 100 caracteres'),
  description: z.string().max(500, 'Máximo 500 caracteres').optional(),
  coins: z
    .string()
    .refine(
      (val) => val === '' || (Number.isInteger(Number(val)) && Number(val) >= 0 && Number(val) <= 9999),
      { message: 'Debe ser entre 0 y 9999' },
    )
    .optional(),
  childId: z.string().min(1, 'Selecciona un hijo'),
  dueDate: z.string().optional(),
})

export type CreateTaskValues = z.infer<typeof createTaskSchema>

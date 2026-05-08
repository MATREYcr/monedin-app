import { z } from 'zod'

const assignmentSchema = z.object({
  childId: z.string().min(1, 'Selecciona un hijo'),
  coins: z
    .string()
    .refine(
      (val) => val === '' || (Number.isInteger(Number(val)) && Number(val) >= 0 && Number(val) <= 9999),
      { message: 'Debe ser entre 0 y 9999' },
    )
    .optional(),
})

export const createTaskSchema = z.object({
  title: z.string().min(2, 'Mínimo 2 caracteres').max(100, 'Máximo 100 caracteres'),
  description: z.string().max(500, 'Máximo 500 caracteres').optional(),
  dueDate: z.string().optional(),
  assignments: z.array(assignmentSchema).min(1, 'Asigna al menos un hijo'),
})

export type CreateTaskValues = z.infer<typeof createTaskSchema>

export const updateTaskSchema = z.object({
  title: z.string().min(2, 'Mínimo 2 caracteres').max(100, 'Máximo 100 caracteres').optional(),
  description: z.string().max(500, 'Máximo 500 caracteres').optional(),
  coins: z
    .string()
    .refine(
      (val) => val === '' || (Number.isInteger(Number(val)) && Number(val) >= 0 && Number(val) <= 9999),
      { message: 'Debe ser entre 0 y 9999' },
    )
    .optional(),
  dueDate: z.string().optional(),
})

export type UpdateTaskValues = z.infer<typeof updateTaskSchema>

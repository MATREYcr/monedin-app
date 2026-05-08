import { z } from 'zod'

const assignmentSchema = z.object({
  childId: z.string().min(1, 'Selecciona un hijo'),
  coins: z
    .string()
    .min(1, 'Ingresa un valor')
    .refine(
      (val) => Number.isInteger(Number(val)) && Number(val) >= 1 && Number(val) <= 9999,
      { message: 'Entre 1 y 9999' },
    ),
})

export const createRewardSchema = z.object({
  title: z.string().min(2, 'Mínimo 2 caracteres').max(100, 'Máximo 100 caracteres'),
  description: z.string().max(500, 'Máximo 500 caracteres').optional(),
  image: z
    .string()
    .url('Debe ser una URL válida')
    .optional()
    .or(z.literal('')),
  assignments: z.array(assignmentSchema).min(1, 'Agrega al menos un hijo'),
})

export type CreateRewardValues = z.infer<typeof createRewardSchema>

export const updateRewardSchema = z.object({
  title: z.string().min(2, 'Mínimo 2 caracteres').max(100, 'Máximo 100 caracteres').or(z.literal('')),
  description: z.string().max(500, 'Máximo 500 caracteres').optional().or(z.literal('')),
  image: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  assignments: z
    .array(
      z.object({
        childId: z.string().min(1, 'Selecciona un hijo'),
        coins: z
          .string()
          .min(1, 'Ingresa un valor')
          .refine(
            (val) => Number.isInteger(Number(val)) && Number(val) >= 1 && Number(val) <= 9999,
            { message: 'Entre 1 y 9999' },
          ),
      }),
    )
    .min(1, 'Agrega al menos un hijo'),
})

export type UpdateRewardValues = z.infer<typeof updateRewardSchema>

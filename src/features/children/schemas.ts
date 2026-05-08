import { z } from 'zod'

export const createChildSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
  username: z.string().min(3, 'Mínimo 3 caracteres').max(20, 'Máximo 20 caracteres'),
  password: z.string().min(4, 'Mínimo 4 caracteres'),
  age: z
    .string()
    .refine((val) => val === '' || (Number.isInteger(Number(val)) && Number(val) >= 6 && Number(val) <= 11), {
      message: 'Debe ser entre 6 y 11 años',
    })
    .optional(),
})

export type CreateChildValues = z.infer<typeof createChildSchema>

export const updateChildSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres').optional(),
  age: z
    .string()
    .refine((val) => val === '' || (Number.isInteger(Number(val)) && Number(val) >= 6 && Number(val) <= 11), {
      message: 'Debe ser entre 6 y 11 años',
    })
    .optional(),
  avatar: z.string().optional(),
})

export type UpdateChildValues = z.infer<typeof updateChildSchema>

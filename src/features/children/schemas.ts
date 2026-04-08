import { z } from 'zod'

export const createChildSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
  username: z.string().min(3, 'Mínimo 3 caracteres').max(20, 'Máximo 20 caracteres'),
  password: z.string().min(4, 'Mínimo 4 caracteres'),
  age: z.coerce
    .number()
    .int()
    .min(6, 'Mínimo 6 años')
    .max(11, 'Máximo 11 años')
    .optional()
    .or(z.literal('')),
})

export type CreateChildValues = z.infer<typeof createChildSchema>

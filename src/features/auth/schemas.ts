import { z } from 'zod'

export const signInParentSchema = z.object({
  email: z.email({ message: 'Email inválido' }),
  password: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
})

export const signInChildSchema = z.object({
  username: z.string().min(3, { message: 'Mínimo 3 caracteres' }).max(20, { message: 'Máximo 20 caracteres' }),
  password: z.string().min(4, { message: 'Mínimo 4 caracteres' }),
})

export const signUpSchema = z.object({
  name: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
  email: z.email({ message: 'Email inválido' }),
  password: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
})

export type SignInParentValues = z.infer<typeof signInParentSchema>
export type SignInChildValues = z.infer<typeof signInChildSchema>
export type SignUpValues = z.infer<typeof signUpSchema>

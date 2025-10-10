import { z } from 'zod'

export const SignupFormSchema = z.object({
    name: z.string().min(1, "El nombre debe tener al menos 2 caracteres").trim(),
    email: z.email({ message: "Por favor, introduzca un email válido." }).trim(),
    password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(/[a-zA-Z]/, "La contraseña debe contener al menos una letra")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número")
    .trim()
})

export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        _form?: string[]
      }
      message?: string
    }
  | undefined
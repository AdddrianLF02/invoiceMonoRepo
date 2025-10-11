import { z } from 'zod';

// Schema para la validación del formulario de login
export const LoginSchema = z.object({
  email: z.email({ message: 'Por favor, introduce un email válido.' }),
  password: z.string().min(1, { message: 'La contraseña es obligatoria.' }),
});

// Schema para la validación del formulario de registro
export const RegisterSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }).optional(),
  email: z.email({ message: 'Por favor, introduce un email válido.' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
});


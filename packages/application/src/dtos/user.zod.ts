// packages/application/src/dtos/user.zod.ts

import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Schema que define los datos necesarios para crear un usuario.
// Coincide con lo que espera el 'CreateUserUseCase'.
export const LoginSchema = z.object({
  email: z.email({ message: 'Por favor, introduce un email válido.' }),
  password: z.string().min(1, { message: 'La contraseña es obligatoria.' }),
});
export class LoginDto extends createZodDto(LoginSchema) {}

// Schema para la validación del formulario de registro
export const RegisterSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.email({ message: 'Por favor, introduce un email válido.' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
  // 1. Añadimos el campo confirmPassword
  confirmPassword: z.string().min(8, { message: 'La confirmación de la contraseña es obligatoria.' }),
})
// 2. Añadimos la función refine para validar que las contraseñas coincidan
.refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden.',
  path: ['confirmPassword'], // Asocia el error al campo de confirmación
});

// Creamos la clase que NestJS y Swagger pueden usar.
export class CreateUserDto extends createZodDto(RegisterSchema) {}
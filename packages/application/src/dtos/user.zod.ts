import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Schema que define los datos necesarios para crear un usuario.
// Coincide con lo que espera el 'CreateUserUseCase'.
const CreateUserSchema = z.object({
  name: z.string().optional(),
  email: z.email('El formato del email es inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
export class LoginDto extends createZodDto(LoginSchema) {}


// Creamos la clase que NestJS y Swagger pueden usar.
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
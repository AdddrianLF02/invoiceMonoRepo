// packages/application/src/dtos/user.zod.ts

import { createZodDto } from 'nestjs-zod';
import {
  LoginSchema,
  CreateUserSchema,
  UpdateUserSchema
} from '@repo/core';

export class LoginDto extends createZodDto(LoginSchema) { }
export class CreateUserDto extends createZodDto(CreateUserSchema) { }
export class UpdateUserDto extends createZodDto(UpdateUserSchema) { }

// Mantenemos las exportaciones por compatibilidad si es que se usan explícitamente desde aquí
export { LoginSchema, CreateUserSchema, UpdateUserSchema };

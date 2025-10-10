import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { CustomerEntitySchema } from '@repo/core'; // Importamos el schema maestro
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// --- DTO para Crear un Cliente (Entrada) ---
const CreateCustomerSchema = CustomerEntitySchema.omit({
  id: true,
  active: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  userId: z.string().uuid()
});
export class CreateCustomerDto extends createZodDto(CreateCustomerSchema) {}


// --- DTO para Actualizar un Cliente (Entrada) ---
const UpdateCustomerSchema = CreateCustomerSchema.partial();
export class UpdateCustomerDto extends createZodDto(UpdateCustomerSchema) {}


// --- DTO para las Respuestas de la API (Salida) ---
// Este es el DTO que describe la forma de un cliente que devolvemos al frontend
const CustomerResponseSchema = CustomerEntitySchema.extend({
    createdAt: z.string(), // Las fechas se serializan como strings
    updatedAt: z.string(),
});
export class CustomerResponseDto extends createZodDto(CustomerResponseSchema) {}

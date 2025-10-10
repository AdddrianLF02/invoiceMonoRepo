import { z } from 'zod';
import { AddressSchema, CustomerIdSchema, EmailSchema, TaxIdSchema } from '../value-objects/schemas';


export const CustomerEntitySchema = z.object({
  id: CustomerIdSchema,
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: EmailSchema,
  address: AddressSchema,
  number: z.string(), // O un schema más específico si tiene un formato
  taxId: TaxIdSchema,
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
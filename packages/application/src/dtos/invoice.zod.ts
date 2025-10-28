import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// --- Schema para un Item de Factura ---
const InvoiceItemSchema = z.object({
  description: z.string().min(1),
  quantity: z.number().positive(),
  unitPrice: z.number().positive(),
  taxRate: z.number().min(0),
});

export class InvoiceItemDto extends createZodDto(InvoiceItemSchema) {}

// --- Crear Factura ---
const CreateInvoiceSchema = z.object({
  customerId: z.uuid(),
  issueDate: z.string().datetime(),
  dueDate: z.string().datetime(),
  items: z.array(InvoiceItemSchema).min(1),
});

export class CreateInvoiceDto extends createZodDto(CreateInvoiceSchema) {}

// --- Actualizar Factura ---
const UpdateInvoiceSchema = CreateInvoiceSchema.partial().extend({
  status: z.enum(['DRAFT', 'PENDING', 'PAID', 'CANCELLED', 'OVERDUE']).optional(),
});

export class UpdateInvoiceDto extends createZodDto(UpdateInvoiceSchema) {}

// --- Respuesta de Factura ---
const InvoiceItemResponseSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  taxRate: z.number(),
});

const InvoiceResponseSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
  invoiceNumber: z.string(),
  status: z.string(),
  issueDate: z.string().datetime(),
  dueDate: z.string().datetime(),
  items: z.array(InvoiceItemResponseSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export class InvoiceResponseDto extends createZodDto(InvoiceResponseSchema) {}

// --- Exports opcionales si necesitas los schemas por separado ---
export {
  InvoiceItemSchema,
  CreateInvoiceSchema,
  UpdateInvoiceSchema,
  InvoiceItemResponseSchema,
  InvoiceResponseSchema,
};

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
  customerId: z.string().uuid(),
  issueDate: z.string().datetime(),
  dueDate: z.string().datetime(),
  items: z.array(InvoiceItemSchema).min(1),
});

export class CreateInvoiceDto extends createZodDto(CreateInvoiceSchema) {}

// --- Actualizar Factura ---
const UpdateInvoiceSchema = CreateInvoiceSchema.partial();

export class UpdateInvoiceDto extends createZodDto(UpdateInvoiceSchema) {}

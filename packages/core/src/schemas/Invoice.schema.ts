import { z } from 'zod';

// Schemas para los Value Objects
const InvoiceIdSchema = z.uuid();
const CustomerIdSchema = z.uuid();
const InvoiceNumberSchema = z.string();
const InvoiceStatusSchema = z.string(); // Podríamos usar z.enum(...) si los estados son fijos

export const InvoiceEntitySchema = z.object({
  id: InvoiceIdSchema,
  customerId: CustomerIdSchema,
  invoiceNumber: InvoiceNumberSchema,
  status: InvoiceStatusSchema,
  issueDate: z.date(),
  dueDate: z.date(),
  items: z.array(z.any()), // Usamos 'any' porque los items son clases, el interceptor los manejará
  createdAt: z.date(),
  updatedAt: z.date(),
});
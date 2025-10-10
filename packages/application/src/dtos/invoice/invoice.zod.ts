import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// --- Schema para un Item de Factura (Entrada) ---
const InvoiceItemSchema = z.object({
  description: z.string().min(1),
  quantity: z.number().positive(),
  unitPrice: z.number().positive(),
  taxRate: z.number().min(0),
});

// Usamos createZodDto para que Swagger entienda la forma de un item
class InvoiceItemDto extends createZodDto(InvoiceItemSchema) {}


// --- Schema para Crear una Factura (Entrada) ---
const CreateInvoiceSchema = z.object({
  customerId: z.string().uuid(),
  issueDate: z.string().datetime({ message: "La fecha de emisión debe estar en formato ISO 8601" }),
  dueDate: z.string().datetime({ message: "La fecha de vencimiento debe estar en formato ISO 8601" }),
  items: z.array(InvoiceItemSchema).min(1, 'La factura debe tener al menos un item'),
});

export class CreateInvoiceDto extends createZodDto(CreateInvoiceSchema) {}


// --- Schema para Actualizar una Factura (Entrada) ---
const UpdateInvoiceSchema = CreateInvoiceSchema.partial(); // Todos los campos son opcionales

export class UpdateInvoiceDto extends createZodDto(UpdateInvoiceSchema) {}


// --- DTO para las Respuestas de la API (Salida) ---
// Este es el DTO que describe la forma de una factura completa que devolvemos
export class InvoiceResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
  id!: string;

  @ApiProperty()
  customerId!: string;
  
  @ApiProperty()
  invoiceNumber!: string;

  @ApiProperty({ enum: ['DRAFT', 'PENDING', 'PAID', 'OVERDUE', 'CANCELLED'] })
  status!: string;
  
  @ApiProperty({ description: 'Fecha en formato ISO 8601', example: '2025-10-05T14:48:00.000Z' })
  issueDate!: string;

  @ApiProperty({ description: 'Fecha en formato ISO 8601', example: '2025-11-05T14:48:00.000Z' })
  dueDate!: string;

  @ApiProperty({ type: [InvoiceItemDto] })
  items!: InvoiceItemDto[];

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}

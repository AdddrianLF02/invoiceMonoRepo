import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateInvoiceDto } from '@repo/application';

// DTO de un item para Swagger
class InvoiceItemSwaggerDto {
  @ApiProperty({ example: 'Servicio de consultoría' })
  description!: string;

  @ApiProperty({ example: 2 })
  quantity!: number;

  @ApiProperty({ example: 150 })
  unitPrice!: number;

  @ApiProperty({ example: 21 })
  taxRate!: number;
}

// DTO de crear factura para Swagger, extendiendo DTO del paquete de dominio
export class CreateInvoiceSwaggerDto extends CreateInvoiceDto {
  @ApiProperty()
  customerId!: string;

  @ApiProperty()
  issueDate!: string;

  @ApiProperty()
  dueDate!: string;

  @ApiProperty({ type: [InvoiceItemSwaggerDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemSwaggerDto)
  items!: InvoiceItemSwaggerDto[];
}

// DTO de respuesta
export class InvoiceResponseSwaggerDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
  id!: string;

  @ApiProperty()
  customerId!: string;

  @ApiProperty()
  invoiceNumber!: string;

  @ApiProperty({ enum: ['DRAFT', 'PENDING', 'PAID', 'OVERDUE', 'CANCELLED'] })
  status!: string;

  @ApiProperty({ example: '2025-10-05T14:48:00.000Z' })
  issueDate!: string;

  @ApiProperty({ example: '2025-11-05T14:48:00.000Z' })
  dueDate!: string;

  @ApiProperty({ type: [InvoiceItemSwaggerDto] })
  items!: InvoiceItemSwaggerDto[];

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}


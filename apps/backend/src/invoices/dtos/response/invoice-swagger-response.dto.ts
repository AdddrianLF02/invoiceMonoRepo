import { ApiProperty } from '@nestjs/swagger';

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

export class InvoiceResponseSwaggerDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
  id!: string;

  @ApiProperty()
  customerId!: string;

  @ApiProperty()
  invoiceNumber!: string;

  @ApiProperty({ enum: ['DRAFT', 'PENDING', 'PAID', 'OVERDUE', 'CANCELLED'] })
  status!: string;

  @ApiProperty()
  issueDate!: string;

  @ApiProperty()
  dueDate!: string;

  @ApiProperty({ type: [InvoiceItemSwaggerDto] })
  items!: InvoiceItemSwaggerDto[];

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}

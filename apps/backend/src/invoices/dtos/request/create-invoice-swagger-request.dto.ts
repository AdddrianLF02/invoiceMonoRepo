import { ApiProperty } from '@nestjs/swagger';
import { CreateInvoiceDto } from '@repo/application';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

class InvoiceItemSwaggerRequestDto {
  @ApiProperty({ example: 'Servicio de consultoría' })
  description!: string;

  @ApiProperty({ example: 2 })
  quantity!: number;

  @ApiProperty({ example: 150 })
  unitPrice!: number;

  @ApiProperty({ example: 21 })
  taxRate!: number;
}

export class CreateInvoiceSwaggerRequestDto extends CreateInvoiceDto {
  @ApiProperty({ example: 'uuid-del-cliente' })
  declare customerId: string;

  @ApiProperty({ example: '2025-10-01T00:00:00.000Z' })
  declare issueDate: string;

  @ApiProperty({ example: '2025-11-01T00:00:00.000Z' })
  declare dueDate: string;

  @ApiProperty({ type: [InvoiceItemSwaggerRequestDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemSwaggerRequestDto)
  declare items: InvoiceItemSwaggerRequestDto[];
}

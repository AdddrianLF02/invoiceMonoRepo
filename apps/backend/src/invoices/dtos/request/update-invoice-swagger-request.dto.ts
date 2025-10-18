import { ApiPropertyOptional } from '@nestjs/swagger';
import { UpdateInvoiceDto } from '@repo/application';

export class UpdateInvoiceSwaggerRequestDto extends UpdateInvoiceDto {
  @ApiPropertyOptional({ example: 'PAID' })
  status?: string;

  @ApiPropertyOptional({ example: '2025-11-20T00:00:00.000Z' })
  dueDate?: string;
}

import { Injectable } from '@nestjs/common';
import { Invoice } from '@repo/core';
import { InvoiceResponseDto } from '../dtos/invoice/invoice.zod';

@Injectable()
export class InvoiceMapper {
  toDto(invoice: Invoice): InvoiceResponseDto {
    return {
      id: invoice.getId().getValue(),
      customerId: invoice.getCustomerId().getValue(),
      invoiceNumber: invoice.getInvoiceNumber().getValue(),
      status: invoice.getStatus().getValue(),
      issueDate: invoice.getIssueDate().toISOString(),
      dueDate: invoice.getDueDate().toISOString(),
      items: invoice.getItems().map(item => ({
        id: item.getId(),
        description: item.getDescription(),
        quantity: item.getQuantity(),
        unitPrice: item.getUnitPrice().getAmount(),
        taxRate: item.getTaxRate(),
      })),
      createdAt: invoice.getCreatedAt().toISOString(),
      updatedAt: invoice.getUpdatedAt().toISOString(),
    };
  }
}
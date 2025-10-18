import { Invoice } from '@repo/core';
import { InvoiceResponseSwaggerDto } from '../dtos/response/invoice-swagger-response.dto';

export class InvoiceMapper {
  static toResponse(invoice: Invoice): InvoiceResponseSwaggerDto {
    return {
      id: invoice.getId().toString(),
      customerId: invoice.getCustomerId().toString(),
      invoiceNumber: invoice.getInvoiceNumber().getValue(),
      status: invoice.getStatus().getValue(),
      issueDate: invoice.getIssueDate().toISOString(),
      dueDate: invoice.getDueDate().toISOString(),
      items: invoice.getItems().map((item) => ({
        id: item.getId().toString(),
        description: item.getDescription(),
        quantity: item.getQuantity(),
        unitPrice: item.getUnitPrice().getAmountAsFloat(),
        taxRate: item.getTaxRate(),
      })),
      createdAt: invoice.getCreatedAt().toISOString(),
      updatedAt: invoice.getUpdatedAt().toISOString(),
    };
  }
}

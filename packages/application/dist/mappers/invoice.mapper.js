"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceMapper = void 0;
class InvoiceMapper {
    toDto(invoice) {
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
                unitPrice: item.getUnitPrice().getAmountAsFloat(),
                taxRate: item.getTaxRate(),
            })),
            createdAt: invoice.getCreatedAt().toISOString(),
            updatedAt: invoice.getUpdatedAt().toISOString(),
        };
    }
}
exports.InvoiceMapper = InvoiceMapper;
//# sourceMappingURL=invoice.mapper.js.map
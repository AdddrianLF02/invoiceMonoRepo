"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceMapper = void 0;
const common_1 = require("@nestjs/common");
let InvoiceMapper = class InvoiceMapper {
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
                unitPrice: item.getUnitPrice().getAmount(),
                taxRate: item.getTaxRate(),
            })),
            createdAt: invoice.getCreatedAt().toISOString(),
            updatedAt: invoice.getUpdatedAt().toISOString(),
        };
    }
};
exports.InvoiceMapper = InvoiceMapper;
exports.InvoiceMapper = InvoiceMapper = __decorate([
    (0, common_1.Injectable)()
], InvoiceMapper);
//# sourceMappingURL=invoice.mapper.js.map
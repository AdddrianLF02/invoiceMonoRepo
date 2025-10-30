"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceResponseSchema = exports.InvoiceItemResponseSchema = exports.UpdateInvoiceSchema = exports.CreateInvoiceSchema = exports.InvoiceItemSchema = exports.InvoiceResponseDto = exports.UpdateInvoiceDto = exports.CreateInvoiceDto = exports.InvoiceItemDto = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
// --- Schema para un Item de Factura ---
const InvoiceItemSchema = zod_1.z.object({
    description: zod_1.z.string().min(1),
    quantity: zod_1.z.number().positive(),
    unitPrice: zod_1.z.number().positive(),
    taxRate: zod_1.z.number().min(0),
});
exports.InvoiceItemSchema = InvoiceItemSchema;
class InvoiceItemDto extends (0, nestjs_zod_1.createZodDto)(InvoiceItemSchema) {
}
exports.InvoiceItemDto = InvoiceItemDto;
// --- Crear Factura ---
const CreateInvoiceSchema = zod_1.z.object({
    customerId: zod_1.z.uuid(),
    issueDate: zod_1.z.string().datetime(),
    dueDate: zod_1.z.string().datetime(),
    items: zod_1.z.array(InvoiceItemSchema).min(1),
});
exports.CreateInvoiceSchema = CreateInvoiceSchema;
class CreateInvoiceDto extends (0, nestjs_zod_1.createZodDto)(CreateInvoiceSchema) {
}
exports.CreateInvoiceDto = CreateInvoiceDto;
// --- Actualizar Factura ---
const UpdateInvoiceSchema = CreateInvoiceSchema.partial().extend({
    status: zod_1.z.enum(['DRAFT', 'PENDING', 'PAID', 'CANCELLED', 'OVERDUE']).optional(),
});
exports.UpdateInvoiceSchema = UpdateInvoiceSchema;
class UpdateInvoiceDto extends (0, nestjs_zod_1.createZodDto)(UpdateInvoiceSchema) {
}
exports.UpdateInvoiceDto = UpdateInvoiceDto;
// --- Respuesta de Factura ---
const InvoiceItemResponseSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    description: zod_1.z.string(),
    quantity: zod_1.z.number(),
    unitPrice: zod_1.z.number(),
    taxRate: zod_1.z.number(),
});
exports.InvoiceItemResponseSchema = InvoiceItemResponseSchema;
const InvoiceResponseSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    customerId: zod_1.z.string().uuid(),
    invoiceNumber: zod_1.z.string(),
    status: zod_1.z.string(),
    issueDate: zod_1.z.string().datetime(),
    dueDate: zod_1.z.string().datetime(),
    items: zod_1.z.array(InvoiceItemResponseSchema),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
});
exports.InvoiceResponseSchema = InvoiceResponseSchema;
class InvoiceResponseDto extends (0, nestjs_zod_1.createZodDto)(InvoiceResponseSchema) {
}
exports.InvoiceResponseDto = InvoiceResponseDto;
//# sourceMappingURL=invoice.zod.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceEntitySchema = void 0;
const zod_1 = require("zod");
// Schemas para los Value Objects
const InvoiceIdSchema = zod_1.z.uuid();
const CustomerIdSchema = zod_1.z.uuid();
const InvoiceNumberSchema = zod_1.z.string();
const InvoiceStatusSchema = zod_1.z.string(); // Podríamos usar z.enum(...) si los estados son fijos
exports.InvoiceEntitySchema = zod_1.z.object({
    id: InvoiceIdSchema,
    customerId: CustomerIdSchema,
    invoiceNumber: InvoiceNumberSchema,
    status: InvoiceStatusSchema,
    issueDate: zod_1.z.date(),
    dueDate: zod_1.z.date(),
    items: zod_1.z.array(zod_1.z.any()), // Usamos 'any' porque los items son clases, el interceptor los manejará
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
//# sourceMappingURL=Invoice.schema.js.map
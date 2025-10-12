import { z } from 'zod';
export declare const InvoiceEntitySchema: z.ZodObject<{
    id: z.ZodUUID;
    customerId: z.ZodUUID;
    invoiceNumber: z.ZodString;
    status: z.ZodString;
    issueDate: z.ZodDate;
    dueDate: z.ZodDate;
    items: z.ZodArray<z.ZodAny>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
//# sourceMappingURL=Invoice.schema.d.ts.map
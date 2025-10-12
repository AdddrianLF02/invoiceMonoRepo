import { z } from 'zod';
declare const InvoiceItemSchema: z.ZodObject<{
    description: z.ZodString;
    quantity: z.ZodNumber;
    unitPrice: z.ZodNumber;
    taxRate: z.ZodNumber;
}, z.core.$strip>;
declare const InvoiceItemDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    description: z.ZodString;
    quantity: z.ZodNumber;
    unitPrice: z.ZodNumber;
    taxRate: z.ZodNumber;
}, z.core.$strip>> & {
    io: "input";
};
export declare class InvoiceItemDto extends InvoiceItemDto_base {
}
declare const CreateInvoiceSchema: z.ZodObject<{
    customerId: z.ZodString;
    issueDate: z.ZodString;
    dueDate: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        taxRate: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const CreateInvoiceDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    customerId: z.ZodString;
    issueDate: z.ZodString;
    dueDate: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        taxRate: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class CreateInvoiceDto extends CreateInvoiceDto_base {
}
declare const UpdateInvoiceSchema: z.ZodObject<{
    customerId: z.ZodOptional<z.ZodString>;
    issueDate: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodString>;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        taxRate: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>;
declare const UpdateInvoiceDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    customerId: z.ZodOptional<z.ZodString>;
    issueDate: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodString>;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        taxRate: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class UpdateInvoiceDto extends UpdateInvoiceDto_base {
}
declare const InvoiceItemResponseSchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
    quantity: z.ZodNumber;
    unitPrice: z.ZodNumber;
    taxRate: z.ZodNumber;
}, z.core.$strip>;
declare const InvoiceResponseSchema: z.ZodObject<{
    id: z.ZodString;
    customerId: z.ZodString;
    invoiceNumber: z.ZodString;
    status: z.ZodString;
    issueDate: z.ZodString;
    dueDate: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        description: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        taxRate: z.ZodNumber;
    }, z.core.$strip>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
declare const InvoiceResponseDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    id: z.ZodString;
    customerId: z.ZodString;
    invoiceNumber: z.ZodString;
    status: z.ZodString;
    issueDate: z.ZodString;
    dueDate: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        description: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        taxRate: z.ZodNumber;
    }, z.core.$strip>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>> & {
    io: "input";
};
export declare class InvoiceResponseDto extends InvoiceResponseDto_base {
}
export { InvoiceItemSchema, CreateInvoiceSchema, UpdateInvoiceSchema, InvoiceItemResponseSchema, InvoiceResponseSchema, };
//# sourceMappingURL=invoice.zod.d.ts.map
import { z } from 'zod';
declare const InvoiceItemSchema: z.ZodObject<{
    description: z.ZodString;
    quantity: z.ZodNumber;
    unitPrice: z.ZodNumber;
    taxRate: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    description?: string;
    quantity?: number;
    unitPrice?: number;
    taxRate?: number;
}, {
    description?: string;
    quantity?: number;
    unitPrice?: number;
    taxRate?: number;
}>;
declare const InvoiceItemDto_base: import("nestjs-zod").ZodDto<{
    description?: string;
    quantity?: number;
    unitPrice?: number;
    taxRate?: number;
}, z.ZodObjectDef<{
    description: z.ZodString;
    quantity: z.ZodNumber;
    unitPrice: z.ZodNumber;
    taxRate: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    description?: string;
    quantity?: number;
    unitPrice?: number;
    taxRate?: number;
}>;
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
    }, "strip", z.ZodTypeAny, {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }, {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    customerId?: string;
    issueDate?: string;
    dueDate?: string;
    items?: {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }[];
}, {
    customerId?: string;
    issueDate?: string;
    dueDate?: string;
    items?: {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }[];
}>;
declare const CreateInvoiceDto_base: import("nestjs-zod").ZodDto<{
    customerId?: string;
    issueDate?: string;
    dueDate?: string;
    items?: {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }[];
}, z.ZodObjectDef<{
    customerId: z.ZodString;
    issueDate: z.ZodString;
    dueDate: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        taxRate: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }, {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }>, "many">;
}, "strip", z.ZodTypeAny>, {
    customerId?: string;
    issueDate?: string;
    dueDate?: string;
    items?: {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }[];
}>;
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
    }, "strip", z.ZodTypeAny, {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }, {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }>, "many">>;
} & {
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "PENDING", "PAID", "CANCELLED", "OVERDUE"]>>;
}, "strip", z.ZodTypeAny, {
    status?: "DRAFT" | "PENDING" | "PAID" | "CANCELLED" | "OVERDUE";
    customerId?: string;
    issueDate?: string;
    dueDate?: string;
    items?: {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }[];
}, {
    status?: "DRAFT" | "PENDING" | "PAID" | "CANCELLED" | "OVERDUE";
    customerId?: string;
    issueDate?: string;
    dueDate?: string;
    items?: {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }[];
}>;
declare const UpdateInvoiceDto_base: import("nestjs-zod").ZodDto<{
    status?: "DRAFT" | "PENDING" | "PAID" | "CANCELLED" | "OVERDUE";
    customerId?: string;
    issueDate?: string;
    dueDate?: string;
    items?: {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }[];
}, z.ZodObjectDef<{
    customerId: z.ZodOptional<z.ZodString>;
    issueDate: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodString>;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        taxRate: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }, {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }>, "many">>;
} & {
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "PENDING", "PAID", "CANCELLED", "OVERDUE"]>>;
}, "strip", z.ZodTypeAny>, {
    status?: "DRAFT" | "PENDING" | "PAID" | "CANCELLED" | "OVERDUE";
    customerId?: string;
    issueDate?: string;
    dueDate?: string;
    items?: {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
    }[];
}>;
export declare class UpdateInvoiceDto extends UpdateInvoiceDto_base {
}
declare const InvoiceItemResponseSchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
    quantity: z.ZodNumber;
    unitPrice: z.ZodNumber;
    taxRate: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    description?: string;
    quantity?: number;
    unitPrice?: number;
    taxRate?: number;
    id?: string;
}, {
    description?: string;
    quantity?: number;
    unitPrice?: number;
    taxRate?: number;
    id?: string;
}>;
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
    }, "strip", z.ZodTypeAny, {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
        id?: string;
    }, {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
        id?: string;
    }>, "many">;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status?: string;
    customerId?: string;
    issueDate?: string;
    dueDate?: string;
    items?: {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
        id?: string;
    }[];
    id?: string;
    invoiceNumber?: string;
    createdAt?: string;
    updatedAt?: string;
}, {
    status?: string;
    customerId?: string;
    issueDate?: string;
    dueDate?: string;
    items?: {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
        id?: string;
    }[];
    id?: string;
    invoiceNumber?: string;
    createdAt?: string;
    updatedAt?: string;
}>;
declare const InvoiceResponseDto_base: import("nestjs-zod").ZodDto<{
    status?: string;
    customerId?: string;
    issueDate?: string;
    dueDate?: string;
    items?: {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
        id?: string;
    }[];
    id?: string;
    invoiceNumber?: string;
    createdAt?: string;
    updatedAt?: string;
}, z.ZodObjectDef<{
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
    }, "strip", z.ZodTypeAny, {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
        id?: string;
    }, {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
        id?: string;
    }>, "many">;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    status?: string;
    customerId?: string;
    issueDate?: string;
    dueDate?: string;
    items?: {
        description?: string;
        quantity?: number;
        unitPrice?: number;
        taxRate?: number;
        id?: string;
    }[];
    id?: string;
    invoiceNumber?: string;
    createdAt?: string;
    updatedAt?: string;
}>;
export declare class InvoiceResponseDto extends InvoiceResponseDto_base {
}
export { InvoiceItemSchema, CreateInvoiceSchema, UpdateInvoiceSchema, InvoiceItemResponseSchema, InvoiceResponseSchema, };
//# sourceMappingURL=invoice.zod.d.ts.map
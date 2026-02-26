import { z } from 'zod';
declare const CreateCustomerDto_base: import("nestjs-zod").ZodDto<{
    number?: string;
    email?: string;
    name?: string;
    address?: {
        street?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    };
    taxId?: string;
    userId?: string;
}, z.ZodObjectDef<{
    email: z.ZodString;
    name: z.ZodString;
    address: z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        street?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    }, {
        street?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    }>;
} & {
    userId: z.ZodOptional<z.ZodString>;
    number: z.ZodOptional<z.ZodString>;
    taxId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny>, {
    number?: string;
    email?: string;
    name?: string;
    address?: {
        street?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    };
    taxId?: string;
    userId?: string;
}>;
export declare class CreateCustomerDto extends CreateCustomerDto_base {
}
declare const UpdateCustomerDto_base: import("nestjs-zod").ZodDto<{
    number?: string;
    email?: string;
    name?: string;
    address?: {
        street?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    };
    taxId?: string;
    active?: boolean;
    userId?: string;
}, z.ZodObjectDef<{
    email: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        street?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    }, {
        street?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    }>>;
    userId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    number: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    taxId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
} & {
    active: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny>, {
    number?: string;
    email?: string;
    name?: string;
    address?: {
        street?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    };
    taxId?: string;
    active?: boolean;
    userId?: string;
}>;
export declare class UpdateCustomerDto extends UpdateCustomerDto_base {
}
declare const CustomerResponseDto_base: import("nestjs-zod").ZodDto<{
    number?: string;
    email?: string;
    name?: string;
    id?: string;
    address?: {
        street?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    };
    taxId?: string;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}, z.ZodObjectDef<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    address: z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        street?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    }, {
        street?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    }>;
    number: z.ZodString;
    taxId: z.ZodString;
    active: z.ZodBoolean;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    number?: string;
    email?: string;
    name?: string;
    id?: string;
    address?: {
        street?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    };
    taxId?: string;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}>;
export declare class CustomerResponseDto extends CustomerResponseDto_base {
}
export {};
//# sourceMappingURL=customer.zod.d.ts.map
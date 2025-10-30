import { z } from 'zod';
declare const CreateCustomerDto_base: import("nestjs-zod").ZodDto<any, ZodTypeDef, z.core.$ZodObjectInternals<{
    name: z.ZodString;
    email: z.ZodString;
    address: z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
    }, z.core.$strip>;
    userId: z.ZodOptional<z.ZodCUID>;
    number: z.ZodOptional<z.ZodString>;
    taxId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>>;
export declare class CreateCustomerDto extends CreateCustomerDto_base {
}
declare const UpdateCustomerDto_base: import("nestjs-zod").ZodDto<any, ZodTypeDef, z.core.$ZodObjectInternals<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
    }, z.core.$strip>>;
    userId: z.ZodOptional<z.ZodOptional<z.ZodCUID>>;
    number: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    taxId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>>;
export declare class UpdateCustomerDto extends UpdateCustomerDto_base {
}
declare const CustomerResponseDto_base: import("nestjs-zod").ZodDto<any, ZodTypeDef, z.core.$ZodObjectInternals<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    address: z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
    }, z.core.$strip>;
    number: z.ZodString;
    taxId: z.ZodString;
    active: z.ZodBoolean;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>>;
export declare class CustomerResponseDto extends CustomerResponseDto_base {
}
export {};
//# sourceMappingURL=customer.zod.d.ts.map
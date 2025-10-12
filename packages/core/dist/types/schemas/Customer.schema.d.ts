import { z } from 'zod';
export declare const CustomerEntitySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodEmail;
    address: z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
    }, z.core.$strip>;
    number: z.ZodString;
    taxId: z.ZodString;
    active: z.ZodBoolean;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
//# sourceMappingURL=Customer.schema.d.ts.map
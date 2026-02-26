import { z } from 'zod';
export declare const CustomerIdSchema: z.ZodString;
export declare const EmailSchema: z.ZodString;
export declare const TaxIdSchema: z.ZodString;
export declare const AddressSchema: z.ZodObject<{
    street: z.ZodString;
    city: z.ZodString;
    zipCode: z.ZodString;
    country: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=schemas.d.ts.map
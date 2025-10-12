import z from "zod";
export declare const AddressSchema: z.ZodObject<{
    street: z.ZodString;
    city: z.ZodString;
    postalCode: z.ZodString;
    country: z.ZodString;
}, z.core.$strip>;
export declare class Address {
    private readonly street;
    private readonly city;
    private readonly postalCode;
    private readonly country;
    private constructor();
    static create(street: string, city: string, postalCode: string, country: string): Address;
    getStreet(): string;
    getCity(): string;
    getPostalCode(): string;
    getCountry(): string;
    equals(address?: Address): boolean;
    toString(): string;
}
//# sourceMappingURL=Address.d.ts.map
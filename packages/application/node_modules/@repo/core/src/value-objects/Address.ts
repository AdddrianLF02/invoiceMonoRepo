import z from "zod";

export const AddressSchema = z.object({
    street: z.string().min(1, 'La calle es requerida'),
    city: z.string().min(1, 'La ciudad es requerida'),
    postalCode: z.string().min(1, 'El código postal es requerido'),
    country: z.string().min(1, 'El país es requerido'),
});

export class Address {
    private readonly street: string;
    private readonly city: string;
    private readonly postalCode: string;
    private readonly country: string;

    private constructor(street: string, city: string, postalCode: string, country: string) {
        this.street = street;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
    }

    public static create(street: string, city: string, postalCode: string, country: string): Address {
        if(!street || !city || !postalCode || !country) {
            throw new Error('All address fields are required');
        }
        return new Address(street, city, postalCode, country);
    }

    public getStreet(): string {
        return this.city;
    }

    public getCity(): string {
        return this.city;
    }

    public getPostalCode(): string {
        return this.postalCode
    }

    public getCountry(): string {
        return this.country;
    }

    public equals(address?: Address): boolean {
        if(address === null || address === undefined) {
            return false;
        }

        return this.street === address.street &&
            this.city === address.city && this.postalCode === address.postalCode &&
            this.country === address.country;
    }

    public toString(): string {
        return `${this.street}, ${this.city}, ${this.postalCode}, ${this.country}`;
    }



}
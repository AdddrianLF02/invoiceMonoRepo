import { Address } from "../value-objects/Address";
import { CustomerId } from "../value-objects/CustomerId";
import { Email } from "../value-objects/Email";
import { TaxId } from "../value-objects/TaxId";
import { UserId } from "../value-objects/UserId";
export declare class Customer {
    readonly id: CustomerId;
    readonly userId: UserId;
    readonly name: string;
    readonly email: Email;
    readonly address: Address;
    readonly number: string;
    readonly taxId: TaxId;
    readonly active: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    private constructor();
    static create(userId: UserId, name: string, email: Email, address: Address, number: string, taxId: TaxId): Customer;
    static reconstitute(id: CustomerId, userId: UserId, // <-- AÑADIDO
    name: string, email: Email, number: string, address: Address, taxId: TaxId, active?: boolean, createdAt?: Date, updatedAt?: Date): Customer;
    private copyWith;
    getId(): CustomerId;
    getUserId(): UserId;
    getName(): string;
    getEmail(): Email;
    getAddress(): Address;
    getNumber(): string;
    getTaxId(): TaxId;
    isActive(): boolean;
    getCreatedAt(): Date;
    getUpdatedAt(): Date;
    updateName(name: string): Customer;
    updateEmail(email: Email): Customer;
    updateAddress(address: Address): Customer;
    updateTaxId(taxId: TaxId): Customer;
    updateNumber(number: string): Customer;
    activate(): Customer;
    deactivate(): Customer;
}
//# sourceMappingURL=Customer.d.ts.map
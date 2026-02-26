import { Address } from "../value-objects/Address";
import { CustomerId } from "../value-objects/CustomerId";
import { Email } from "../value-objects/Email";
import { TaxId } from "../value-objects/TaxId";
import { UserId } from "../value-objects/UserId";
export declare class Customer {
    private readonly id;
    private readonly userId;
    private readonly name;
    private readonly email;
    private readonly address;
    private readonly number;
    private readonly taxId;
    private readonly active;
    private readonly createdAt;
    private readonly updatedAt;
    private constructor();
    static create(userId: UserId, name: string, email: Email, address: Address, number: string, taxId: TaxId): Customer;
    static reconstitute(id: CustomerId, userId: UserId, name: string, email: Email, number: string, address: Address, taxId: TaxId, active?: boolean, createdAt?: Date, updatedAt?: Date): Customer;
    private copyWith;
    getId(): CustomerId;
    getUserId(): UserId;
    getName(): string;
    getEmail(): Email;
    getAddress(): Address;
    getNumber(): string;
    getTaxId(): TaxId;
    getActive(): boolean;
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
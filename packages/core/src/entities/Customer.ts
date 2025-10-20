import { CustomerEntitySchema } from "../schemas/Customer.schema";
import { Address } from "../value-objects/Address";
import { CustomerId } from "../value-objects/CustomerId";
import { Email } from "../value-objects/Email";
import { TaxId } from "../value-objects/TaxId";
import { UserId } from "../value-objects/UserId";

export class Customer {
    private readonly id: CustomerId;
    private readonly userId: UserId;
    private readonly name: string;
    private readonly email: Email;
    private readonly address: Address;
    private readonly number: string;
    private readonly taxId: TaxId;
    private readonly active: boolean;
    private readonly createdAt: Date;
    private readonly updatedAt: Date;

    private constructor(
        id: CustomerId,
        userId: UserId,
        name: string,
        email: Email,
        address: Address,
        number: string,
        taxId: TaxId,
        active: boolean = true,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.address = address;
        this.number = number;
        this.taxId = taxId;
        this.active = active;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    public static create(
        userId: UserId,
        name: string,
        email: Email,
        address: Address,
        number: string,
        taxId: TaxId
    ): Customer {
        if (!name || name.trim().length === 0) {
            throw new Error('Customer name cannot be empty');
        }
        const now = new Date();
        return new Customer(
            CustomerId.create(),
            userId,
            name,
            email,
            address,
            number,
            taxId,
            true,
            now,
            now
        );
    }

    public static reconstitute(
        id: CustomerId,
        userId: UserId,
        name: string,
        email: Email,
        number: string,
        address: Address,
        taxId: TaxId,
        active: boolean = true,
        createdAt?: Date,
        updatedAt?: Date
    ): Customer {
        return new Customer(
            id,
            userId,
            name,
            email,
            address,
            number,
            taxId,
            active,
            createdAt,
            updatedAt
        );
    }

    private copyWith(props: {
        userId?: UserId;
        name?: string;
        email?: Email;
        address?: Address;
        number?: string;
        taxId?: TaxId;
        active?: boolean;
    }): Customer {
        return new Customer(
            this.id,
            props.userId ?? this.userId,
            props.name ?? this.name,
            props.email ?? this.email,
            props.address ?? this.address,
            props.number ?? this.number,
            props.taxId ?? this.taxId,
            props.active ?? this.active,
            this.createdAt,
            new Date()
        );
    }

    // --- Getters ---
    public getId(): CustomerId { return this.id; }
    public getUserId(): UserId { return this.userId; }
    public getName(): string { return this.name; }
    public getEmail(): Email { return this.email; }
    public getAddress(): Address { return this.address; }
    public getNumber(): string { return this.number; }
    public getTaxId(): TaxId { return this.taxId; }
    public getActive(): boolean { return this.active; }
    public getCreatedAt(): Date { return this.createdAt; }
    public getUpdatedAt(): Date { return this.updatedAt; }

    // --- Métodos de comportamiento (inmutables) ---
    public updateName(name: string): Customer {
        CustomerEntitySchema.shape.name.parse(name);
        return this.copyWith({ name });
    }

    public updateEmail(email: Email): Customer { return this.copyWith({ email }); }
    public updateAddress(address: Address): Customer { return this.copyWith({ address }); }
    public updateTaxId(taxId: TaxId): Customer { return this.copyWith({ taxId }); }
    public updateNumber(number: string): Customer { return this.copyWith({ number }); }

    public activate(): Customer {
        if (this.active) return this;
        return this.copyWith({ active: true });
    }

    public deactivate(): Customer {
        if (!this.active) return this;
        return this.copyWith({ active: false });
    }
}

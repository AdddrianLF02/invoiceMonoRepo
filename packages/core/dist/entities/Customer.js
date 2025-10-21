"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const Customer_schema_1 = require("../schemas/Customer.schema");
const CustomerId_1 = require("../value-objects/CustomerId");
class Customer {
    id;
    userId;
    name;
    email;
    address;
    number;
    taxId;
    active;
    createdAt;
    updatedAt;
    constructor(id, userId, name, email, address, number, taxId, active = true, createdAt, updatedAt) {
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
    static create(userId, name, email, address, number, taxId) {
        if (!name || name.trim().length === 0) {
            throw new Error("Customer name cannot be empty");
        }
        const now = new Date();
        return new Customer(CustomerId_1.CustomerId.create(), userId, name, email, address, number, taxId, true, now, now);
    }
    static reconstitute(id, userId, name, email, number, address, taxId, active = true, createdAt, updatedAt) {
        return new Customer(id, userId, name, email, address, number, taxId, active, createdAt, updatedAt);
    }
    copyWith(props) {
        return new Customer(this.id, props.userId ?? this.userId, props.name ?? this.name, props.email ?? this.email, props.address ?? this.address, props.number ?? this.number, props.taxId ?? this.taxId, props.active ?? this.active, this.createdAt, new Date());
    }
    // --- Getters ---
    getId() { return this.id; }
    getUserId() { return this.userId; }
    getName() { return this.name; }
    getEmail() { return this.email; }
    getAddress() { return this.address; }
    getNumber() { return this.number; }
    getTaxId() { return this.taxId; }
    getActive() { return this.active; }
    getCreatedAt() { return this.createdAt; }
    getUpdatedAt() { return this.updatedAt; }
    // --- Métodos inmutables ---
    updateName(name) {
        Customer_schema_1.CustomerEntitySchema.shape.name.parse(name);
        return this.copyWith({ name });
    }
    updateEmail(email) { return this.copyWith({ email }); }
    updateAddress(address) { return this.copyWith({ address }); }
    updateTaxId(taxId) { return this.copyWith({ taxId }); }
    updateNumber(number) { return this.copyWith({ number }); }
    activate() {
        if (this.active)
            return this;
        return this.copyWith({ active: true });
    }
    deactivate() {
        if (!this.active)
            return this;
        return this.copyWith({ active: false });
    }
}
exports.Customer = Customer;
//# sourceMappingURL=Customer.js.map
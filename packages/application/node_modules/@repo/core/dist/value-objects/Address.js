"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = exports.AddressSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.AddressSchema = zod_1.default.object({
    street: zod_1.default.string().min(1, 'La calle es requerida'),
    city: zod_1.default.string().min(1, 'La ciudad es requerida'),
    postalCode: zod_1.default.string().min(1, 'El código postal es requerido'),
    country: zod_1.default.string().min(1, 'El país es requerido'),
});
class Address {
    street;
    city;
    postalCode;
    country;
    constructor(street, city, postalCode, country) {
        this.street = street;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
    }
    static create(street, city, postalCode, country) {
        if (!street || !city || !postalCode || !country) {
            throw new Error('All address fields are required');
        }
        return new Address(street, city, postalCode, country);
    }
    getStreet() {
        return this.city;
    }
    getCity() {
        return this.city;
    }
    getPostalCode() {
        return this.postalCode;
    }
    getCountry() {
        return this.country;
    }
    equals(address) {
        if (address === null || address === undefined) {
            return false;
        }
        return this.street === address.street &&
            this.city === address.city && this.postalCode === address.postalCode &&
            this.country === address.country;
    }
    toString() {
        return `${this.street}, ${this.city}, ${this.postalCode}, ${this.country}`;
    }
}
exports.Address = Address;
//# sourceMappingURL=Address.js.map
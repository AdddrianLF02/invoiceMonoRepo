"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = void 0;
/**
 * Value Object para representar un valor monetario.
 * Encapsula la lógica de validación y operaciones con importes monetarios.
 */
class Money {
    amount;
    currency;
    constructor(amount, currency = 'EUR') {
        this.amount = amount;
        this.currency = currency;
    }
    static create(amount, currency = 'EUR') {
        if (amount < 0) {
            throw new Error('Money amount cannot be negative');
        }
        if (!currency || currency.trim().length === 0) {
            throw new Error('Currency cannot be empty');
        }
        return new Money(amount, currency);
    }
    static zero(currency = 'EUR') {
        return new Money(0, currency);
    }
    getAmount() {
        return this.amount;
    }
    getCurrency() {
        return this.currency;
    }
    add(money) {
        if (this.currency !== money.currency) {
            throw new Error('Cannot add money with different currencies');
        }
        return new Money(this.amount + money.amount, this.currency);
    }
    subtract(money) {
        if (this.currency !== money.currency) {
            throw new Error('Cannot subtract money with different currencies');
        }
        if (this.amount < money.amount) {
            throw new Error('Cannot subtract to a negative amount');
        }
        return new Money(this.amount - money.amount, this.currency);
    }
    multiply(factor) {
        if (factor < 0) {
            throw new Error('Cannot multiply by a negative factor');
        }
        return new Money(this.amount * factor, this.currency);
    }
    equals(other) {
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof Money)) {
            return false;
        }
        return this.amount === other.amount && this.currency === other.currency;
    }
    toString() {
        return `${this.amount} ${this.currency}`;
    }
}
exports.Money = Money;
//# sourceMappingURL=Money.js.map
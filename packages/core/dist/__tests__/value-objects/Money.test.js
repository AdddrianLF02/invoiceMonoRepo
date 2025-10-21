"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Money_1 = require("../../value-objects/Money");
describe('Money', () => {
    describe('fromFloat', () => {
        it('should create a Money object from a float amount', () => {
            const money = Money_1.Money.fromFloat(10.99);
            expect(money.getAmountInCents()).toBe(1099n);
            expect(money.getCurrency()).toBe('EUR');
        });
        it('should round to the nearest cent', () => {
            const money = Money_1.Money.fromFloat(10.995);
            expect(money.getAmountInCents()).toBe(1100n);
        });
        it('should throw an error for negative amounts', () => {
            expect(() => {
                Money_1.Money.fromFloat(-10.99);
            }).toThrow('Money amount cannot be negative');
        });
        it('should throw an error for non-EUR currency', () => {
            expect(() => {
                Money_1.Money.fromFloat(10.99, 'USD');
            }).toThrow('Only EUR currency is supported in Spain');
        });
    });
    describe('zero', () => {
        it('should create a zero Money object', () => {
            const money = Money_1.Money.zero();
            expect(money.getAmountInCents()).toBe(0n);
            expect(money.getCurrency()).toBe('EUR');
        });
        it('should throw an error for non-EUR currency', () => {
            expect(() => {
                Money_1.Money.zero('USD');
            }).toThrow('Only EUR currency is supported in Spain');
        });
    });
    describe('getAmountAsFloat', () => {
        it('should return the amount as a float', () => {
            const money = Money_1.Money.fromFloat(10.99);
            expect(money.getAmountAsFloat()).toBe(10.99);
        });
    });
    describe('add', () => {
        it('should add two Money objects', () => {
            const money1 = Money_1.Money.fromFloat(10.99);
            const money2 = Money_1.Money.fromFloat(20.01);
            const result = money1.add(money2);
            expect(result.getAmountInCents()).toBe(3100n);
            expect(result.getAmountAsFloat()).toBe(31);
        });
        it('should throw an error when adding different currencies', () => {
            const money1 = Money_1.Money.fromFloat(10.99);
            // Simulamos un objeto Money con una moneda diferente para probar
            const money2 = Object.create(Money_1.Money.fromFloat(20.01));
            Object.defineProperty(money2, 'currency', { value: 'USD' });
            expect(() => {
                money1.add(money2);
            }).toThrow('Cannot add money with different currencies');
        });
    });
    describe('multiply', () => {
        it('should multiply by an integer factor', () => {
            const money = Money_1.Money.fromFloat(10.99);
            const result = money.multiply(3);
            expect(result.getAmountInCents()).toBe(3297n);
            expect(result.getAmountAsFloat()).toBe(32.97);
        });
        it('should multiply by a decimal factor', () => {
            const money = Money_1.Money.fromFloat(100);
            const result = money.multiply(0.21); // IVA
            expect(result.getAmountInCents()).toBe(2100n);
            expect(result.getAmountAsFloat()).toBe(21);
        });
        it('should throw an error for negative factors', () => {
            const money = Money_1.Money.fromFloat(10.99);
            expect(() => {
                money.multiply(-2);
            }).toThrow('Cannot multiply by a negative factor');
        });
    });
    describe('equals', () => {
        it('should return true for equal Money objects', () => {
            const money1 = Money_1.Money.fromFloat(10.99);
            const money2 = Money_1.Money.fromFloat(10.99);
            expect(money1.equals(money2)).toBe(true);
        });
        it('should return false for different amounts', () => {
            const money1 = Money_1.Money.fromFloat(10.99);
            const money2 = Money_1.Money.fromFloat(10.98);
            expect(money1.equals(money2)).toBe(false);
        });
        it('should return false for null or undefined', () => {
            const money = Money_1.Money.fromFloat(10.99);
            expect(money.equals(null)).toBe(false);
            expect(money.equals(undefined)).toBe(false);
        });
        it('should return false for non-Money objects', () => {
            const money = Money_1.Money.fromFloat(10.99);
            // @ts-ignore - Ignoramos el error de tipo para probar el caso
            expect(money.equals('not-a-money-object')).toBe(false);
        });
    });
    describe('toString', () => {
        it('should return a formatted string representation', () => {
            const money = Money_1.Money.fromFloat(10.99);
            expect(money.toString()).toBe('10.99 EUR');
        });
        it('should format zero correctly', () => {
            const money = Money_1.Money.zero();
            expect(money.toString()).toBe('0.00 EUR');
        });
    });
});
//# sourceMappingURL=Money.test.js.map
/**
 * Value Object para representar un valor monetario, utilizando BigInt (céntimos) internamente
 * para garantizar precisión aritmética, esencial para sistemas financieros (incluso en EUR).
 */
export declare class Money {
    private readonly amountInCents;
    private readonly currency;
    private constructor();
    static fromFloat(amount: number, currency?: string): Money;
    static zero(currency?: string): Money;
    getAmountInCents(): bigint;
    getAmountAsFloat(): number;
    getCurrency(): string;
    add(money: Money): Money;
    multiply(factor: number): Money;
    equals(other?: Money): boolean;
    toString(): string;
}
//# sourceMappingURL=Money.d.ts.map
/**
 * Value Object para representar un valor monetario.
 * Encapsula la lógica de validación y operaciones con importes monetarios.
 */
export declare class Money {
    private readonly amount;
    private readonly currency;
    private constructor();
    static create(amount: number, currency?: string): Money;
    static zero(currency?: string): Money;
    getAmount(): number;
    getCurrency(): string;
    add(money: Money): Money;
    subtract(money: Money): Money;
    multiply(factor: number): Money;
    equals(other?: Money): boolean;
    toString(): string;
}
//# sourceMappingURL=Money.d.ts.map
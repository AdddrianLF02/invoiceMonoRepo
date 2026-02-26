import z from "zod";
export declare const EmailSchema: z.ZodEmail;
export declare class Email {
    private readonly value;
    private constructor();
    static create(email: string): Email;
    getValue(): string;
    equals(email?: Email): boolean;
    toString(): string;
}
//# sourceMappingURL=Email.d.ts.map
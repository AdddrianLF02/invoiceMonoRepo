import { z } from 'zod';
import { UserId } from '../value-objects/UserId';
import { Email } from '../value-objects/Email';
export declare const UserEntitySchema: z.ZodObject<{
    id: z.ZodCUID;
    name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    email: z.ZodEmail;
    password: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
export type UserData = z.infer<typeof UserEntitySchema>;
export declare class User {
    private readonly id;
    private readonly name;
    private readonly email;
    private readonly password;
    private readonly createdAt;
    private readonly updatedAt;
    private constructor();
    static create(props: Omit<UserData, 'id' | 'createdAt' | 'updatedAt'>): User;
    toSafeObject(): {
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    };
    static reconstitute(props: UserData): User;
    comparePassword(plainText: string): Promise<boolean>;
    getId(): UserId;
    getName(): string | null;
    getEmail(): Email;
    getPasswordHash(): string;
    getCreatedAt(): Date;
    getUpdatedAt(): Date;
}
//# sourceMappingURL=User.d.ts.map
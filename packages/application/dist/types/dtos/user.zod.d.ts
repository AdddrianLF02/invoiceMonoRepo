import { LoginSchema, CreateUserSchema, UpdateUserSchema } from '@repo/core';
declare const LoginDto_base: import("nestjs-zod").ZodDto<{
    email?: string;
    pass?: string;
}, import("zod").ZodObjectDef<{
    email: import("zod").ZodString;
    pass: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    email?: string;
    pass?: string;
}>;
export declare class LoginDto extends LoginDto_base {
}
declare const CreateUserDto_base: import("nestjs-zod").ZodDto<{
    email?: string;
    name?: string;
    password?: string;
}, import("zod").ZodObjectDef<{
    name: import("zod").ZodString;
    email: import("zod").ZodString;
    password: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    email?: string;
    name?: string;
    password?: string;
}>;
export declare class CreateUserDto extends CreateUserDto_base {
}
declare const UpdateUserDto_base: import("nestjs-zod").ZodDto<{
    email?: string;
    name?: string;
    password?: string;
    currentPassword?: string;
    updateCustomerInfo?: boolean;
}, import("zod").ZodEffectsDef<import("zod").ZodObject<{
    name: import("zod").ZodOptional<import("zod").ZodString>;
    email: import("zod").ZodOptional<import("zod").ZodString>;
    password: import("zod").ZodOptional<import("zod").ZodString>;
    currentPassword: import("zod").ZodOptional<import("zod").ZodString>;
    updateCustomerInfo: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodBoolean>>;
}, "strip", import("zod").ZodTypeAny, {
    email?: string;
    name?: string;
    password?: string;
    currentPassword?: string;
    updateCustomerInfo?: boolean;
}, {
    email?: string;
    name?: string;
    password?: string;
    currentPassword?: string;
    updateCustomerInfo?: boolean;
}>>, {
    email?: string;
    name?: string;
    password?: string;
    currentPassword?: string;
    updateCustomerInfo?: boolean;
}>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export { LoginSchema, CreateUserSchema, UpdateUserSchema };
//# sourceMappingURL=user.zod.d.ts.map
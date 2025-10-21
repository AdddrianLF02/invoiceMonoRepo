import { z } from 'zod';
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
declare const LoginDto_base: import("nestjs-zod").ZodDto<any, ZodTypeDef, z.core.$ZodObjectInternals<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>>;
export declare class LoginDto extends LoginDto_base {
}
export declare const RegisterSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export declare const CreateUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
declare const CreateUserDto_base: import("nestjs-zod").ZodDto<any, ZodTypeDef, z.core.$ZodObjectInternals<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>>;
export declare class CreateUserDto extends CreateUserDto_base {
}
export declare const UpdateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    currentPassword: z.ZodOptional<z.ZodString>;
    updateCustomerInfo: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
declare const UpdateUserDto_base: import("nestjs-zod").ZodDto<any, ZodTypeDef, z.core.$ZodObjectInternals<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    currentPassword: z.ZodOptional<z.ZodString>;
    updateCustomerInfo: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
//# sourceMappingURL=user.zod.d.ts.map
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
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
declare const CreateUserDto_base: import("nestjs-zod").ZodDto<any, ZodTypeDef, z.core.$ZodObjectInternals<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>>;
export declare class CreateUserDto extends CreateUserDto_base {
}
export {};
//# sourceMappingURL=user.zod.d.ts.map
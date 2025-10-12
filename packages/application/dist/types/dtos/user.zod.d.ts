import { z } from 'zod';
declare const LoginDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>> & {
    io: "input";
};
export declare class LoginDto extends LoginDto_base {
}
declare const CreateUserDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>> & {
    io: "input";
};
export declare class CreateUserDto extends CreateUserDto_base {
}
export {};
//# sourceMappingURL=user.zod.d.ts.map
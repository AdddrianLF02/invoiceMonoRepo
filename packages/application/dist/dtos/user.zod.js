"use strict";
// packages/application/src/dtos/user.zod.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = exports.UpdateUserSchema = exports.CreateUserDto = exports.CreateUserSchema = exports.RegisterSchema = exports.LoginDto = exports.LoginSchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
// Schema que define los datos necesarios para crear un usuario.
// Coincide con lo que espera el 'CreateUserUseCase'.
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.email({ message: 'Por favor, introduce un email válido.' }),
    pass: zod_1.z.string().min(1, { message: 'La contraseña es obligatoria.' }),
});
class LoginDto extends (0, nestjs_zod_1.createZodDto)(exports.LoginSchema) {
}
exports.LoginDto = LoginDto;
// FRONTEND: esquema con confirmación de contraseña
exports.RegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
    email: zod_1.z.string().email({ message: 'Por favor, introduce un email válido.' }),
    password: zod_1.z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
    confirmPassword: zod_1.z.string().min(8, { message: 'La confirmación de la contraseña es obligatoria.' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
});
// BACKEND: esquema sin confirmación
exports.CreateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
class CreateUserDto extends (0, nestjs_zod_1.createZodDto)(exports.CreateUserSchema) {
}
exports.CreateUserDto = CreateUserDto;
exports.UpdateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(8).optional(),
    currentPassword: zod_1.z.string().optional(),
    updateCustomerInfo: zod_1.z.boolean().optional().default(false),
}).refine(data => {
    // Si se proporciona password, currentPassword es obligatorio
    return !data.password || (data.password && data.currentPassword);
}, {
    message: 'Se requiere la contraseña actual para cambiar la contraseña',
    path: ['currentPassword'],
});
class UpdateUserDto extends (0, nestjs_zod_1.createZodDto)(exports.UpdateUserSchema) {
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=user.zod.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = exports.RegisterSchema = exports.LoginDto = exports.LoginSchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
// Schema que define los datos necesarios para crear un usuario.
// Coincide con lo que espera el 'CreateUserUseCase'.
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.email({ message: 'Por favor, introduce un email válido.' }),
    password: zod_1.z.string().min(1, { message: 'La contraseña es obligatoria.' }),
});
class LoginDto extends (0, nestjs_zod_1.createZodDto)(exports.LoginSchema) {
}
exports.LoginDto = LoginDto;
// Schema para la validación del formulario de registro
exports.RegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
    email: zod_1.z.email({ message: 'Por favor, introduce un email válido.' }),
    password: zod_1.z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
});
// Creamos la clase que NestJS y Swagger pueden usar.
class CreateUserDto extends (0, nestjs_zod_1.createZodDto)(exports.RegisterSchema) {
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=user.zod.js.map
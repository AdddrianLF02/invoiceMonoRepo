"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = exports.LoginDto = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
// Schema que define los datos necesarios para crear un usuario.
// Coincide con lo que espera el 'CreateUserUseCase'.
const CreateUserSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.email('El formato del email es inválido'),
    password: zod_1.z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});
const LoginSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string(),
});
class LoginDto extends (0, nestjs_zod_1.createZodDto)(LoginSchema) {
}
exports.LoginDto = LoginDto;
// Creamos la clase que NestJS y Swagger pueden usar.
class CreateUserDto extends (0, nestjs_zod_1.createZodDto)(CreateUserSchema) {
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=user.zod.js.map
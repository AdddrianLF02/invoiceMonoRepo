"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = exports.LoginSchema = void 0;
const zod_1 = require("zod");
// Schema para la validación del formulario de login
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.email({ message: 'Por favor, introduce un email válido.' }),
    password: zod_1.z.string().min(1, { message: 'La contraseña es obligatoria.' }),
});
// Schema para la validación del formulario de registro
exports.RegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }).optional(),
    email: zod_1.z.email({ message: 'Por favor, introduce un email válido.' }),
    password: zod_1.z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
});
//# sourceMappingURL=Auth.schema.js.map
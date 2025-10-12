"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSchema = exports.TaxIdSchema = exports.EmailSchema = exports.CustomerIdSchema = void 0;
const zod_1 = require("zod");
// Asumimos que CustomerId es un UUID
exports.CustomerIdSchema = zod_1.z.string().uuid('El ID del cliente debe ser un UUID válido');
exports.EmailSchema = zod_1.z.string().email('El formato del email es inválido');
// Puedes hacer validaciones más complejas si es necesario, ej. con .regex()
exports.TaxIdSchema = zod_1.z.string().min(1, 'El NIF/CIF es obligatorio');
exports.AddressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1, 'La calle es obligatoria'),
    city: zod_1.z.string().min(1, 'La ciudad es obligatoria'),
    zipCode: zod_1.z.string().min(1, 'El código postal es obligatorio'),
    country: zod_1.z.string().min(1, 'El país es obligatorio'),
});
//# sourceMappingURL=schemas.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerResponseDto = exports.UpdateCustomerDto = exports.CreateCustomerDto = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
const core_1 = require("@repo/core"); // Importamos el schema maestro
// --- DTO para Crear un Cliente (Entrada) ---
const CreateCustomerSchema = core_1.CustomerEntitySchema.omit({
    id: true,
    active: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    userId: zod_1.z.string().uuid()
});
class CreateCustomerDto extends (0, nestjs_zod_1.createZodDto)(CreateCustomerSchema) {
}
exports.CreateCustomerDto = CreateCustomerDto;
// --- DTO para Actualizar un Cliente (Entrada) ---
const UpdateCustomerSchema = CreateCustomerSchema.partial();
class UpdateCustomerDto extends (0, nestjs_zod_1.createZodDto)(UpdateCustomerSchema) {
}
exports.UpdateCustomerDto = UpdateCustomerDto;
// --- DTO para las Respuestas de la API (Salida) ---
// Este es el DTO que describe la forma de un cliente que devolvemos al frontend
const CustomerResponseSchema = core_1.CustomerEntitySchema.extend({
    createdAt: zod_1.z.string(), // Las fechas se serializan como strings
    updatedAt: zod_1.z.string(),
});
class CustomerResponseDto extends (0, nestjs_zod_1.createZodDto)(CustomerResponseSchema) {
}
exports.CustomerResponseDto = CustomerResponseDto;
//# sourceMappingURL=customer.zod.js.map
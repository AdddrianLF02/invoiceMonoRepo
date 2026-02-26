"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerId = exports.CustomerIdSchema = void 0;
const uuid_1 = require("uuid");
const zod_1 = __importDefault(require("zod"));
exports.CustomerIdSchema = zod_1.default.string().uuid();
/**
 * Value Object para representar el ID de un cliente.
 * Encapsulamos la lógica de negocio relacionada con el ID del cliente.
 */
class CustomerId {
    value;
    // Constructor privado para evitar la creación directa de instancias
    constructor(id) {
        this.value = id;
    }
    // Generamos un nuevo UUID para nuevos clientes
    static create() {
        return new CustomerId((0, uuid_1.v4)());
    }
    // Permite reconstruir el ID desde la base de datos.
    static fromString(id) {
        if (!id) {
            throw new Error('CustomerId cannot be empty');
        }
        return new CustomerId(id);
    }
    getValue() {
        return this.value;
    }
    // Implementamos comparación por valor, no por referencia.
    equals(id) {
        if (id === null || id === undefined) {
            return false;
        }
        if (!(id instanceof CustomerId)) {
            return false;
        }
        return this.value === id.value;
    }
    toString() {
        return this.value;
    }
}
exports.CustomerId = CustomerId;
//# sourceMappingURL=CustomerId.js.map
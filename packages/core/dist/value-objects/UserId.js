"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const zod_1 = require("zod");
const cuid_1 = __importDefault(require("cuid"));
// Schema de Zod para la validación
const UserIdSchema = zod_1.z.cuid('El ID de usuario debe ser un CUID válido');
class UserId {
    value;
    constructor(value) {
        this.value = value;
    }
    static create() {
        return new UserId((0, cuid_1.default)());
    }
    static fromString(value) {
        UserIdSchema.parse(value); // Valida que el string sea un CUID
        return new UserId(value);
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.UserId = UserId;
//# sourceMappingURL=UserId.js.map
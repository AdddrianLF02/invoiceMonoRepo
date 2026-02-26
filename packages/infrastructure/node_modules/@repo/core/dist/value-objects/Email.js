"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = exports.EmailSchema = void 0;
const zod_1 = require("zod");
// Zod no expone un método z.email(); debe ser z.string().email()
exports.EmailSchema = zod_1.z.string().email({ message: "El formato del email es inválido" });
class Email {
    value;
    constructor(email) {
        this.value = email;
    }
    static create(email) {
        if (!email) {
            throw new Error('Email cannot be empty');
        }
        // Validación básica de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        return new Email(email);
    }
    getValue() {
        return this.value;
    }
    equals(email) {
        if (email === null || email === undefined) {
            return false;
        }
        return this.value.toLowerCase() === email.value.toLowerCase();
    }
    toString() {
        return this.value;
    }
}
exports.Email = Email;
//# sourceMappingURL=Email.js.map
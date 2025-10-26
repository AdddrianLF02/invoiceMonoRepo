"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserEntitySchema = void 0;
const zod_1 = require("zod");
const UserId_1 = require("../value-objects/UserId");
const Email_1 = require("../value-objects/Email"); // Asumimos que EmailSchema está en el VO de Email
// --- Schema de Zod para la Entidad ---
exports.UserEntitySchema = zod_1.z.object({
    id: zod_1.z.cuid('El ID de usuario debe ser un CUID válido'),
    name: zod_1.z.string().optional().nullable(),
    email: Email_1.EmailSchema, // Usamos el schema del Value Object
    password: zod_1.z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// --- La Clase de Dominio 'User' ---
class User {
    id;
    name;
    email;
    password; // La contraseña es privada y readonly
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = UserId_1.UserId.fromString(props.id);
        this.name = props.name ?? null;
        this.email = Email_1.Email.create(props.email);
        this.password = props.password;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    // Factory para crear un nuevo usuario
    static create(props) {
        const validatedProps = exports.UserEntitySchema.omit({
            id: true,
            createdAt: true,
            updatedAt: true
        }).parse(props);
        return new User({
            id: UserId_1.UserId.create().getValue(), // Genera un CUID nuevo
            ...validatedProps,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    toSafeObject() {
        // Este método devuelve un objeto JavaScript plano
        // con todos los datos EXCEPTO la contraseña.
        return {
            id: this.id.getValue(),
            name: this.name,
            email: this.email.getValue(),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    // Factory para reconstruir un usuario desde la base de datos
    static reconstitute(props) {
        // Bypass revalidación del `id`, ya que el `id` ya está validado al crearse el usuario
        const validatedProps = exports.UserEntitySchema.omit({ id: true }).parse(props);
        return new User({
            ...validatedProps,
            id: props.id, // usar el id real proveniente de la base de datos
        });
    }
    // --- MÉTODOS DE COMPORTAMIENTO ---
    // Método para comparar contraseñas (necesitará bcrypt)
    async comparePassword(plainText) {
        const bcrypt = await import('bcrypt');
        return bcrypt.compare(plainText, this.password);
    }
    // --- GETTERS COMPLETOS ---
    getId() { return this.id; }
    getName() { return this.name; }
    getEmail() { return this.email; }
    getPasswordHash() { return this.password; }
    getCreatedAt() { return this.createdAt; }
    getUpdatedAt() { return this.updatedAt; }
    // Métodos de actualización inmutables
    copyWith(props) {
        return new User({
            id: this.id.getValue(),
            name: props.name ?? this.name,
            email: props.email ?? this.email.getValue(),
            password: props.password ?? this.password,
            createdAt: this.createdAt,
            updatedAt: new Date(),
        });
    }
    updateName(name) {
        return this.copyWith({ name });
    }
    updateEmail(email) {
        return this.copyWith({ email: email.getValue() });
    }
    updatePassword(password) {
        return this.copyWith({ password });
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map
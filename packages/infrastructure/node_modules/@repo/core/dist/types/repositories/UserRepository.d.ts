import { User } from "../entities/User";
import { Email } from "../value-objects/Email";
import { UserId } from "../value-objects/UserId";
export interface UserRepository {
    /**
     * Crea un nuevo usuario en el repositorio
     * @param user Usuario a crear
     */
    create(user: User): Promise<User>;
    /**
     * Guarda un usuario en el repositorio (crear o actualizar)
     * @param user Usuario a guardar
     */
    save(user: User): Promise<void>;
    /**
     * Busca un usuario por su ID
     * @param id ID del usuario a buscar
     */
    findById(id: UserId): Promise<User | null>;
    /**
     * Busca un usuario por su email
     * @param email Email del usuario a buscar
     */
    findByEmail(email: Email): Promise<User | null>;
    /**
     * Actualiza un usuario existente
     * @param user Usuario con los datos actualizados
     */
    update(user: User): Promise<User>;
    /**
     * Elimina un usuario del repositorio
     * @param id ID del usuario a eliminar
     */
    delete(id: UserId): Promise<void>;
}
//# sourceMappingURL=UserRepository.d.ts.map
import { Customer } from "../entities/Customer";
import { CustomerId } from "../value-objects/CustomerId";
import { Email } from "../value-objects/Email";
import { UserId } from "../value-objects/UserId";
export interface CustomerRepository {
    /**
     * Crea un nuevo cliente en el repositorio
     * @param customer Cliente a crear
     */
    create(customer: Customer): Promise<Customer>;
    /**
     * Busca un cliente por su ID
     * @param id ID del cliente a buscar
     */
    findById(id: CustomerId): Promise<Customer | null>;
    /**
     * Busca un cliente por su email
     * @param email Email del cliente a buscar
     */
    findByEmail(email: Email): Promise<Customer | null>;
    /**
     * Actualiza un cliente existente
     * @param customer Cliente con los datos actualizados
     */
    update(customer: Customer): Promise<Customer>;
    /**
     * Busca todos los clientes de un usuario
     * @param userId ID del usuario propietario
     */
    findByUserId(userId: UserId): Promise<Customer[]>;
    /**
     * Elimina un cliente del repositorio
     * @param id ID del cliente a eliminar
     */
    delete(id: CustomerId): Promise<void>;
    /**
     * Verifica si existe un cliente con el ID especificado
     * @param id ID del cliente a verificar
     */
    exists(id: CustomerId): Promise<boolean>;
}
//# sourceMappingURL=CustomerRepository.d.ts.map
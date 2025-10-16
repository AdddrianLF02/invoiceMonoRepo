import { CustomerRepository } from "./CustomerRepository";
import { InvoiceRepository } from "./InvoiceRepository";

// Interfaz que expone el conjunto de repositorios dentro de la transacción
export interface IUnitOfWork {
    // Definimos un token para la inyección
    UOW_TOKEN: symbol;

    // Repositorios específicos (pueden ser 'transactional-scoped')
    readonly invoiceRepository: InvoiceRepository;
    readonly customerRepository: CustomerRepository;

    // Método para ejecutar la lógica de negocio transaccional
    executeTransaction<T>(callback: () => Promise<T>): Promise<T>;
}

// TOKEN DE INYECCIÓN
export const UNIT_OF_WORK = Symbol('IUnitOfWork');
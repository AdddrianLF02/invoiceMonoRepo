import { Injectable, Scope } from "@nestjs/common";
import { CustomerRepository, InvoiceRepository, IUnitOfWork, UNIT_OF_WORK } from "@repo/core";
import { PrismaService } from "./prisma.service";
import { PrismaInvoiceRepository } from "../repositories/invoice.repository";
import { PrismaCustomerRepository } from "../repositories/customer.repository";

@Injectable({ scope: Scope.REQUEST })// [CRÍTICO] Debe ser Request-Scope
export class PrismaUnitOfWork implements IUnitOfWork {
    UOW_TOKEN = UNIT_OF_WORK;

    // INICIALIZACIÓN DE REPOSITORIOS
    public invoiceRepository: InvoiceRepository;
    public customerRepository: CustomerRepository;

    // Inyectamos el servicio Prisma ( que es el cliente )
    constructor(private readonly prisma: PrismaService) {
        // INICIALIZAMOS CON EL CLIENTE BASE ( SIN TRANSACCIÓN )
        this.invoiceRepository = new PrismaInvoiceRepository(this.prisma);
        this.customerRepository = new PrismaCustomerRepository(this.prisma);
    }

    async executeTransaction<T>(callback: () => Promise<T>): Promise<T> {
        // Ejecuta la transacción de Prisma, obteniendo un cliente transaccional
        return this.prisma.$transaction(async (tx) => {
            // Reemplaza los repositorios con versiones que usan el cliente transaccional
            this.invoiceRepository = new PrismaInvoiceRepository(tx as any); 
            this.customerRepository = new PrismaCustomerRepository(tx as any); 
            
            // Ejecuta el Caso de Uso (callback)
            return callback();
        })
    }
}
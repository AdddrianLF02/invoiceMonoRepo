import { CustomerRepository, InvoiceRepository, IUnitOfWork, UserRepository } from "@repo/core";
import { PrismaService } from "./prisma.service";
export declare class PrismaUnitOfWork implements IUnitOfWork {
    private readonly prisma;
    UOW_TOKEN: symbol;
    invoiceRepository: InvoiceRepository;
    customerRepository: CustomerRepository;
    userRepository: UserRepository;
    constructor(prisma: PrismaService);
    executeTransaction<T>(callback: () => Promise<T>): Promise<T>;
}
//# sourceMappingURL=prisma-uow.service.d.ts.map
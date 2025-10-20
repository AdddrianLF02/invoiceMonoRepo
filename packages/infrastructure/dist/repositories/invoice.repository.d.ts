import { Invoice, type InvoiceRepository, InvoiceId, CustomerId } from '@repo/core';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
export type PrismaClientOrTx = PrismaService | Prisma.TransactionClient;
export declare class PrismaInvoiceRepository implements InvoiceRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(invoice: Invoice): Promise<Invoice>;
    findById(id: InvoiceId): Promise<Invoice | null>;
    findByCustomerId(customerId: CustomerId): Promise<Invoice[]>;
    update(invoice: Invoice): Promise<Invoice>;
    delete(id: InvoiceId): Promise<void>;
    private mapToDomain;
}
//# sourceMappingURL=invoice.repository.d.ts.map
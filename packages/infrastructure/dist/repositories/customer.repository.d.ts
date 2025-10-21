import { PrismaService } from '../database/prisma.service';
import { Customer, type CustomerRepository, CustomerId, UserId, Email } from '@repo/core';
export declare class PrismaCustomerRepository implements CustomerRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(customer: Customer): Promise<Customer>;
    findById(id: CustomerId): Promise<Customer | null>;
    findByEmail(email: Email): Promise<Customer | null>;
    update(customer: Customer): Promise<Customer>;
    findByUserId(userId: UserId): Promise<Customer[]>;
    delete(id: CustomerId): Promise<void>;
    exists(id: CustomerId): Promise<boolean>;
}
//# sourceMappingURL=customer.repository.d.ts.map
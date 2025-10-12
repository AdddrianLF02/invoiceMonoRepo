import { type UserRepository, User, Email } from '@repo/core';
import { PrismaService } from '../database/prisma.service';
export declare class PrismaUserRepository implements UserRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(user: User): Promise<User>;
    findByEmail(email: Email): Promise<User | null>;
}
//# sourceMappingURL=user.repository.d.ts.map
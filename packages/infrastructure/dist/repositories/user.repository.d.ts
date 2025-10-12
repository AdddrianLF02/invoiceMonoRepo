import { type UserRepository, User, Email } from '@repo/core';
import { PrismaService } from '@repo/infrastructure';
export declare class PrismaUserRepository implements UserRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(user: User): Promise<User>;
    findByEmail(email: Email): Promise<User | null>;
}
//# sourceMappingURL=user.repository.d.ts.map
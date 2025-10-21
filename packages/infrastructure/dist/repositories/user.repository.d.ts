import { type UserRepository, User, Email, UserId } from '@repo/core';
import { PrismaService } from '../database/prisma.service';
export declare class PrismaUserRepository implements UserRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(user: User): Promise<User>;
    findByEmail(email: Email): Promise<User | null>;
    findById(id: UserId): Promise<User | null>;
    update(user: User): Promise<User>;
    save(user: User): Promise<void>;
    delete(id: UserId): Promise<void>;
}
//# sourceMappingURL=user.repository.d.ts.map
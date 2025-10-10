import { Injectable } from "@nestjs/common";
import {
  type UserRepository,
  User,
  Email
} from '@repo/core'
import {
  PrismaService
} from '@repo/infrastructure'

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaService) {}

    async create(user: User): Promise<User> {
        const createdUser = await this.prisma.user.create({
            data: {
                email: user.getEmail().toString(),
                password: user.getPasswordHash(),
                name: user.name,
            },
        });
        return User.reconstitute(createdUser);
    }

    async findByEmail(email: Email): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email: email.toString() },
    });

    if (!userData) return null;

    return User.reconstitute(userData);
  }
}
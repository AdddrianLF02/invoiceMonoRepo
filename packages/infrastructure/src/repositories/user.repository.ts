import { Injectable } from "@nestjs/common";
import {
  type UserRepository,
  User,
  Email,
  UserId
} from '@repo/core'
import {
  PrismaService
} from '../database/prisma.service'

@Injectable()
export class PrismaUserRepository implements UserRepository {

    constructor(private prisma: PrismaService) {}

    async create(user: User): Promise<User> {
        const createdUser = await this.prisma.user.create({
            data: {
                email: user.getEmail().toString(),
                password: user.getPasswordHash(),
                name: user.getName(),
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

  async findById(id: UserId): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id: id.getValue() },
    });

    if (!userData) return null;

    return User.reconstitute(userData);
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.getId().getValue() },
      data: {
        email: user.getEmail().toString(),
        password: user.getPasswordHash(),
        name: user.getName(),
        updatedAt: user.getUpdatedAt(),
      },
    });

    return User.reconstitute(updatedUser);
  }

  async save(user: User): Promise<void> {
    await this.update(user);
  }

  async delete(id: UserId): Promise<void> {
    await this.prisma.user.delete({
      where: { id: id.getValue() },
    });
  }
}
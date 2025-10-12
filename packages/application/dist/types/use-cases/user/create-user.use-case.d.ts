import { type UserRepository, User } from '@repo/core';
import { CreateUserDto } from '../../dtos/user.zod';
export declare class CreateUserUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(input: CreateUserDto): Promise<User>;
}
//# sourceMappingURL=create-user.use-case.d.ts.map
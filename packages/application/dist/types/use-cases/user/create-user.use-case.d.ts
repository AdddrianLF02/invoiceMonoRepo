import { type UserRepository, User } from '@repo/core';
import { CreateUserDto } from '../../dtos/user.zod';
import { CreateUserInputPort } from './ports/input-port';
export declare class CreateUserUseCase implements CreateUserInputPort {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(input: CreateUserDto): Promise<User>;
}
//# sourceMappingURL=create-user.use-case.d.ts.map
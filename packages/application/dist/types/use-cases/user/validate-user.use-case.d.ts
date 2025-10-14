import { type UserRepository, User } from '@repo/core';
import { ValidateUserInputPort } from './ports/input-port';
export type SafeUser = ReturnType<User['toSafeObject']>;
export declare class ValidateUserUseCase implements ValidateUserInputPort {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(email: string, pass: string): Promise<SafeUser | null>;
}
//# sourceMappingURL=validate-user.use-case.d.ts.map
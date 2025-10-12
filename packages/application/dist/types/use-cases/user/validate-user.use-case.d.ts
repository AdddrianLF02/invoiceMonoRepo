import { type UserRepository, User } from '@repo/core';
type SafeUser = ReturnType<User['toSafeObject']>;
export declare class ValidateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(email: string, pass: string): Promise<SafeUser | null>;
}
export {};
//# sourceMappingURL=validate-user.use-case.d.ts.map
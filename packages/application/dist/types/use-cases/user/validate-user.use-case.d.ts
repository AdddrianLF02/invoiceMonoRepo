import { type UserRepository } from '@repo/core';
import { ValidateUserInputPort } from './ports/input-port';
import { type ValidateUserOutputPort } from './ports/output-port';
export declare class ValidateUserUseCase implements ValidateUserInputPort {
    private readonly userRepository;
    private readonly outputPort;
    constructor(userRepository: UserRepository, outputPort: ValidateUserOutputPort);
    execute(email: string, pass: string): Promise<void>;
}
//# sourceMappingURL=validate-user.use-case.d.ts.map
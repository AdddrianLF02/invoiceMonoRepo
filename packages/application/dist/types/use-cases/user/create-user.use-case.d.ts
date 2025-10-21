import { type IUnitOfWork } from '@repo/core';
import { CreateUserDto } from '../../dtos/user.zod';
import { CreateUserInputPort } from './ports/input-port';
import { type CreateUserOutputPort } from './ports/output-port';
export declare class CreateUserUseCase implements CreateUserInputPort {
    private readonly uow;
    private readonly outputPort;
    constructor(uow: IUnitOfWork, outputPort: CreateUserOutputPort);
    execute(input: CreateUserDto): Promise<void>;
}
//# sourceMappingURL=create-user.use-case.d.ts.map
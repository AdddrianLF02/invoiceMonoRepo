import { type IUnitOfWork } from '@repo/core';
import { UpdateUserDto } from '../../dtos/user.zod';
import { UpdateUserInputPort } from './ports/input-port';
import { type UpdateUserOutputPort } from './ports/output-port';
export declare class UpdateUserUseCase implements UpdateUserInputPort {
    private readonly unitOfWork;
    private readonly outputPort;
    constructor(unitOfWork: IUnitOfWork, outputPort: UpdateUserOutputPort);
    execute(userId: string, input: UpdateUserDto): Promise<void>;
}
//# sourceMappingURL=update-user.use-case.d.ts.map
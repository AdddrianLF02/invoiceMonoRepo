import { type UserRepository } from "@repo/core";
import { GetUserProfileInputPort } from "./ports/input-port";
import { type GetUserProfileOutputPort } from "./ports/output-port";
export declare class GetUserProfileUseCase implements GetUserProfileInputPort {
    private userRepository;
    private getUserProfileOutputPort;
    constructor(userRepository: UserRepository, getUserProfileOutputPort: GetUserProfileOutputPort);
    execute(userId: string): Promise<void>;
}
//# sourceMappingURL=get-user-profile.use-case.d.ts.map
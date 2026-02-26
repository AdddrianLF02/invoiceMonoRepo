import { USER_REPOSITORY, UserId, type UserRepository } from "@repo/core";
// GetUserProfileUseCase (Clean Architecture)
import { GetUserProfileInputPort } from "./ports/input-port";
import { GET_USER_PROFILE_OUTPUT_TOKEN, type GetUserProfileOutputPort } from "./ports/output-port";

export class GetUserProfileUseCase implements GetUserProfileInputPort {
    constructor
        (
            private userRepository: UserRepository,
            private getUserProfileOutputPort: GetUserProfileOutputPort,
        ) { }

    async execute(userId: string): Promise<void> {
        const user = await this.userRepository.findById(UserId.fromString(userId));
        this.getUserProfileOutputPort.present({
            id: user.getId().getValue(),
            email: user.getEmail().toString(),
            name: user.getName(),
        });
    }
}
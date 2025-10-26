import { USER_REPOSITORY, UserId, type UserRepository } from "@repo/core";
import { Injectable, Inject } from "@nestjs/common";
import { GetUserProfileInputPort } from "./ports/input-port";
import { GET_USER_PROFILE_OUTPUT_TOKEN, type GetUserProfileOutputPort } from "./ports/output-port";

@Injectable()
export class GetUserProfileUseCase implements GetUserProfileInputPort {
    constructor
    (
        @Inject(USER_REPOSITORY)
        private userRepository: UserRepository,
        @Inject(GET_USER_PROFILE_OUTPUT_TOKEN)
        private getUserProfileOutputPort: GetUserProfileOutputPort,
    ) {}

    async execute(userId: string): Promise<void> {
        const user = await this.userRepository.findById(UserId.fromString(userId));
        this.getUserProfileOutputPort.present({
            id: user.getId().getValue(),
            email: user.getEmail().toString(),
            name: user.getName(),
        });
    }
}
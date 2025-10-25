import { USER_REPOSITORY, type UserRepository } from "@repo/core";
import { Injectable, Inject } from "@nestjs/common";
import { GetUserProfileInputPort } from "./ports/input-port";
import { GET_USER_PROFILE_OUTPUT_TOKEN, type GetUserProfileOutputPort } from "./ports/output-port";

@Injectable()
export default class GetUserProfileUseCase implements GetUserProfileInputPort {
    constructor
    (
        @Inject(USER_REPOSITORY)
        private userRepository: UserRepository,
        @Inject(GET_USER_PROFILE_OUTPUT_TOKEN)
        private getUserProfileOutputPort: GetUserProfileOutputPort,
    ) {}

    async execute(userId: string): Promise<void> {
        const user = await this.userRepository.findById(userId);
        this.getUserProfileOutputPort.present({
            userId: user.id.toString(),
            email: user.email,
            name: user.name,
        };
    }
}
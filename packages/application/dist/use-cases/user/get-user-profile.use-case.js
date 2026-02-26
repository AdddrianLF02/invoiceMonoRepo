"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserProfileUseCase = void 0;
const core_1 = require("@repo/core");
class GetUserProfileUseCase {
    userRepository;
    getUserProfileOutputPort;
    constructor(userRepository, getUserProfileOutputPort) {
        this.userRepository = userRepository;
        this.getUserProfileOutputPort = getUserProfileOutputPort;
    }
    async execute(userId) {
        const user = await this.userRepository.findById(core_1.UserId.fromString(userId));
        this.getUserProfileOutputPort.present({
            id: user.getId().getValue(),
            email: user.getEmail().toString(),
            name: user.getName(),
        });
    }
}
exports.GetUserProfileUseCase = GetUserProfileUseCase;
//# sourceMappingURL=get-user-profile.use-case.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUserUseCase = void 0;
// ValidateUserUseCase (Clean Architecture)
const core_1 = require("@repo/core");
class ValidateUserUseCase {
    userRepository;
    outputPort;
    constructor(userRepository, outputPort) {
        this.userRepository = userRepository;
        this.outputPort = outputPort;
    }
    async execute(email, pass) {
        const user = await this.userRepository.findByEmail(core_1.Email.create(email));
        if (user && (await user.comparePassword(pass))) {
            await this.outputPort.present(user.toSafeObject());
            return;
        }
        await this.outputPort.present(null);
    }
}
exports.ValidateUserUseCase = ValidateUserUseCase;
//# sourceMappingURL=validate-user.use-case.js.map
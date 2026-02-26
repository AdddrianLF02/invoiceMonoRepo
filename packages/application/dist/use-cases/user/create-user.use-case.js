"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
// CreateUserUseCase (Clean Architecture)
const core_1 = require("@repo/core");
class CreateUserUseCase {
    uow;
    outputPort;
    constructor(uow, outputPort) {
        this.uow = uow;
        this.outputPort = outputPort;
    }
    async execute(input) {
        await this.uow.executeTransaction(async () => {
            const repo = this.uow.userRepository;
            const bcrypt = await import('bcrypt');
            const saltRounds = 10;
            try {
                // Hash the password securely
                const hashedPassword = await bcrypt.hash(input.password, saltRounds);
                // Create the user object
                const user = core_1.User.create({
                    name: input.name,
                    email: input.email,
                    password: hashedPassword
                });
                // Log the created user (excluding sensitive info like password)
                console.log('User object created:', user);
                await repo.create(user);
                this.outputPort.present(user);
            }
            catch (error) {
                // Log the error for debugging purposes
                console.error('Error creating user:', error);
                throw error;
            }
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
//# sourceMappingURL=create-user.use-case.js.map
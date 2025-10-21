"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@repo/core");
const output_port_1 = require("./ports/output-port");
let CreateUserUseCase = class CreateUserUseCase {
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
                await repo.save(user);
                this.outputPort.present(user);
            }
            catch (error) {
                // Log the error for debugging purposes
                console.error('Error creating user:', error);
                throw error;
            }
        });
    }
};
exports.CreateUserUseCase = CreateUserUseCase;
exports.CreateUserUseCase = CreateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.UNIT_OF_WORK)),
    __param(1, (0, common_1.Inject)(output_port_1.CREATE_USER_OUTPUT_TOKEN)),
    __metadata("design:paramtypes", [Object, Object])
], CreateUserUseCase);
//# sourceMappingURL=create-user.use-case.js.map
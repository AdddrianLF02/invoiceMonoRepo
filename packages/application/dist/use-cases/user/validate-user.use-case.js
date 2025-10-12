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
exports.ValidateUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@repo/core");
let ValidateUserUseCase = class ValidateUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email, pass) {
        const user = await this.userRepository.findByEmail(core_1.Email.create(email));
        if (user && (await user.comparePassword(pass))) {
            return user.toSafeObject();
        }
        return null;
    }
};
exports.ValidateUserUseCase = ValidateUserUseCase;
exports.ValidateUserUseCase = ValidateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ValidateUserUseCase);
//# sourceMappingURL=validate-user.use-case.js.map
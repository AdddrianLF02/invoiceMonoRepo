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
exports.GetAllCustomersUseCase = void 0;
const common_1 = require("@nestjs/common");
const ports_1 = require("./ports");
const core_1 = require("@repo/core");
let GetAllCustomersUseCase = class GetAllCustomersUseCase {
    uow;
    outputPort;
    constructor(uow, outputPort) {
        this.uow = uow;
        this.outputPort = outputPort;
    }
    async execute(userId) {
        const uid = core_1.UserId.fromString(userId);
        const customers = await this.uow.customerRepository.findByUserId(uid);
        this.outputPort.present(customers);
    }
};
exports.GetAllCustomersUseCase = GetAllCustomersUseCase;
exports.GetAllCustomersUseCase = GetAllCustomersUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.UNIT_OF_WORK)),
    __param(1, (0, common_1.Inject)(ports_1.GET_ALL_CUSTOMERS_OUTPUT_TOKEN)),
    __metadata("design:paramtypes", [Object, Object])
], GetAllCustomersUseCase);
//# sourceMappingURL=get-all-customers.use-case.js.map
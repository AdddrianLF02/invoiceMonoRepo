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
exports.GetCustomerByIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@repo/core");
const output_port_1 = require("./ports/output-port");
let GetCustomerByIdUseCase = class GetCustomerByIdUseCase {
    customerRepository;
    outputPort;
    constructor(customerRepository, outputPort) {
        this.customerRepository = customerRepository;
        this.outputPort = outputPort;
    }
    async execute(id) {
        const customerId = core_1.CustomerId.fromString(id);
        const customer = await this.customerRepository.findById(customerId);
        this.outputPort.present(customer);
    }
};
exports.GetCustomerByIdUseCase = GetCustomerByIdUseCase;
exports.GetCustomerByIdUseCase = GetCustomerByIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.CUSTOMER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(output_port_1.GET_CUSTOMER_BY_ID_OUTPUT_TOKEN)),
    __metadata("design:paramtypes", [Object, Object])
], GetCustomerByIdUseCase);
//# sourceMappingURL=get-customer-by-id.use-case.js.map
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
exports.CreateCustomerUseCase = void 0;
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const core_1 = require("@repo/core");
const output_port_1 = require("./ports/output-port");
let CreateCustomerUseCase = class CreateCustomerUseCase {
    uow;
    outputPort;
    constructor(uow, outputPort) {
        this.uow = uow;
        this.outputPort = outputPort;
    }
    async execute(input) {
        await this.uow.executeTransaction(async () => {
            const repo = this.uow.customerRepository;
            const email = core_1.Email.create(input.email);
            const existingCustomer = await repo.findByEmail(email);
            if (existingCustomer) {
                throw new common_1.ConflictException('Ya existe un cliente con este email');
            }
            // Creamos el Value Object para el UserId
            const userId = core_1.UserId.fromString(input.userId);
            const address = core_1.Address.create(input.street || '', input.city || '', input.postalCode || '', input.country || '');
            const taxId = input.taxId
                ? core_1.TaxId.create(input.taxId)
                : undefined;
            // Creamos el cliente
            const customer = core_1.Customer.create(userId, input.name, email, address, input.number || '', taxId);
            await repo.create(customer);
            this.outputPort.present(customer);
        });
    }
};
exports.CreateCustomerUseCase = CreateCustomerUseCase;
exports.CreateCustomerUseCase = CreateCustomerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.UNIT_OF_WORK)),
    __param(1, (0, common_1.Inject)(output_port_1.CREATE_CUSTOMER_OUTPUT_TOKEN)),
    __metadata("design:paramtypes", [Object, Object])
], CreateCustomerUseCase);
//# sourceMappingURL=create-customer.use-case.js.map
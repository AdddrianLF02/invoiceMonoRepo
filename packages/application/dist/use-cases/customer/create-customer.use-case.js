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
let CreateCustomerUseCase = class CreateCustomerUseCase {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(input) {
        const email = core_1.Email.create(input.email);
        const existingCustomer = await this.customerRepository.findByEmail(email);
        if (existingCustomer) {
            // Usamos una excepción de NestJS para un mejor manejo de errores
            throw new common_1.ConflictException('Ya existe un cliente con este email');
        }
        // 2. Creamos el Value Object para el UserId
        const userId = core_1.UserId.fromString(input.userId);
        const address = core_1.Address.create(input.street || '', input.city || '', input.postalCode || '', input.country || '');
        const taxId = core_1.TaxId.create(input.taxId || '');
        // 3. Pasamos el 'userId' al crear la entidad Customer
        const customer = core_1.Customer.create(userId, input.name, email, address, // Reutilizamos la variable, más limpio
        input.number || '', taxId);
        return this.customerRepository.create(customer);
    }
};
exports.CreateCustomerUseCase = CreateCustomerUseCase;
exports.CreateCustomerUseCase = CreateCustomerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.CUSTOMER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateCustomerUseCase);
//# sourceMappingURL=create-customer.use-case.js.map
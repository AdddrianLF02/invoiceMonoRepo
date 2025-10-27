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
exports.UpdateCustomerUseCase = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@repo/core");
const output_port_1 = require("./ports/output-port");
let UpdateCustomerUseCase = class UpdateCustomerUseCase {
    uow;
    outputPort;
    constructor(uow, outputPort) {
        this.uow = uow;
        this.outputPort = outputPort;
    }
    async execute(input) {
        await this.uow.executeTransaction(async () => {
            const repo = this.uow.customerRepository;
            const customerId = core_1.CustomerId.fromString(input.id);
            // Obtenemos la entidad de dominio original
            let customer = await repo.findById(customerId);
            if (!customer) {
                throw new common_1.NotFoundException('Cliente no encontrado');
            }
            // --- ENCADENANDO ACTUALIZACIONES INMUTABLES ---
            // Cada 'update' devuelve una nueva instancia de 'customer'
            if (input.name !== undefined) {
                customer = customer.updateName(input.name);
            }
            if (input.number !== undefined) {
                customer = customer.updateNumber(input.number);
            }
            if (input.email !== undefined) {
                const newEmail = core_1.Email.create(input.email);
                // Verificamos que el nuevo email no esté en uso por otro cliente del mismo usuario
                const customersOfUser = await repo.findByUserId(customer.getUserId());
                const emailInUseByAnother = customersOfUser.some(c => c.getEmail().equals(newEmail) && !c.getId().equals(customerId));
                if (emailInUseByAnother) {
                    throw new common_1.ConflictException('El email ya está en uso por otro cliente de este usuario');
                }
                customer = customer.updateEmail(newEmail);
            }
            // Si se actualiza cualquier parte de la dirección, creamos un nuevo Value Object
            if (input.street !== undefined || input.city !== undefined || input.postalCode !== undefined || input.country !== undefined) {
                const newAddress = core_1.Address.create(input.street ?? customer.getAddress().getStreet(), input.city ?? customer.getAddress().getCity(), input.postalCode ?? customer.getAddress().getPostalCode(), input.country ?? customer.getAddress().getCountry());
                customer = customer.updateAddress(newAddress);
            }
            if (input.taxId !== undefined) {
                const newTaxId = core_1.TaxId.create(input.taxId);
                customer = customer.updateTaxId(newTaxId);
            }
            if (input.isActive === true) {
                customer = customer.activate();
            }
            else if (input.isActive === false) {
                customer = customer.deactivate();
            }
            // Persistimos la versión final y actualizada de la entidad
            await repo.update(customer);
            this.outputPort.present(customer);
        });
    }
};
exports.UpdateCustomerUseCase = UpdateCustomerUseCase;
exports.UpdateCustomerUseCase = UpdateCustomerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.UNIT_OF_WORK)),
    __param(1, (0, common_1.Inject)(output_port_1.UPDATE_CUSTOMER_OUTPUT_TOKEN)),
    __metadata("design:paramtypes", [Object, Object])
], UpdateCustomerUseCase);
//# sourceMappingURL=update-customer.use-case.js.map
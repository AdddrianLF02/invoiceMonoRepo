"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerUseCase = void 0;
const core_1 = require("@repo/core");
class CreateCustomerUseCase {
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
            // Creamos el Value Object para el UserId
            const userId = core_1.UserId.fromString(input.userId);
            // Verify that the user exists to avoid FK violation
            const userExists = await this.uow.userRepository.findById(userId);
            if (!userExists) {
                throw new Error('NOT_FOUND: Usuario no encontrado');
            }
            // Validar que el email no esté ya en uso dentro del mismo usuario (multi-tenant)
            const existingForUser = await repo.findByUserId(userId);
            const emailInUse = existingForUser.some(c => c.getEmail().equals(email));
            if (emailInUse) {
                throw new Error('CONFLICT: El email ya está en uso por otro cliente de este usuario');
            }
            const address = core_1.Address.create(input.address?.street, input.address?.city, input.address?.postalCode, input.address?.country);
            const taxId = input.taxId
                ? core_1.TaxId.create(input.taxId)
                : undefined;
            const customer = core_1.Customer.create(userId, input.name, email, address, input.number || '', taxId);
            await repo.create(customer);
            this.outputPort.present(customer);
        });
    }
}
exports.CreateCustomerUseCase = CreateCustomerUseCase;
//# sourceMappingURL=create-customer.use-case.js.map
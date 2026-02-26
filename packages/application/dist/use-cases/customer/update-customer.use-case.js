"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerUseCase = void 0;
const core_1 = require("@repo/core");
class UpdateCustomerUseCase {
    uow;
    outputPort;
    constructor(uow, outputPort) {
        this.uow = uow;
        this.outputPort = outputPort;
    }
    async execute(id, input) {
        await this.uow.executeTransaction(async () => {
            const repo = this.uow.customerRepository;
            const customerId = core_1.CustomerId.fromString(id);
            // Obtenemos la entidad de dominio original
            let customer = await repo.findById(customerId);
            if (!customer) {
                throw new Error('NOT_FOUND: Cliente no encontrado');
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
                    throw new Error('CONFLICT: El email ya está en uso por otro cliente de este usuario');
                }
                customer = customer.updateEmail(newEmail);
            }
            // Si se actualiza cualquier parte de la dirección, creamos un nuevo Value Object
            if (input.address !== undefined) {
                const newAddress = core_1.Address.create(input.address.street ?? customer.getAddress().getStreet(), input.address.city ?? customer.getAddress().getCity(), input.address.postalCode ?? customer.getAddress().getPostalCode(), input.address.country ?? customer.getAddress().getCountry());
                customer = customer.updateAddress(newAddress);
            }
            if (input.taxId !== undefined) {
                const newTaxId = core_1.TaxId.create(input.taxId);
                customer = customer.updateTaxId(newTaxId);
            }
            if (input.active === true) {
                customer = customer.activate();
            }
            else if (input.active === false) {
                customer = customer.deactivate();
            }
            // Persistimos la versión final y actualizada de la entidad
            await repo.update(customer);
            this.outputPort.present(customer);
        });
    }
}
exports.UpdateCustomerUseCase = UpdateCustomerUseCase;
//# sourceMappingURL=update-customer.use-case.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCustomerByEmailUseCase = void 0;
const core_1 = require("@repo/core");
class GetCustomerByEmailUseCase {
    customerRepository;
    outputPort;
    constructor(customerRepository, outputPort) {
        this.customerRepository = customerRepository;
        this.outputPort = outputPort;
    }
    async execute(email) {
        const customerEmail = core_1.Email.create(email);
        const customer = await this.customerRepository.findByEmail(customerEmail);
        this.outputPort.present(customer);
    }
}
exports.GetCustomerByEmailUseCase = GetCustomerByEmailUseCase;
//# sourceMappingURL=get-customer-by-email.use-case.js.map
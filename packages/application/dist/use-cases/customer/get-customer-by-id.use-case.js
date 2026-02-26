"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCustomerByIdUseCase = void 0;
const core_1 = require("@repo/core");
class GetCustomerByIdUseCase {
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
}
exports.GetCustomerByIdUseCase = GetCustomerByIdUseCase;
//# sourceMappingURL=get-customer-by-id.use-case.js.map
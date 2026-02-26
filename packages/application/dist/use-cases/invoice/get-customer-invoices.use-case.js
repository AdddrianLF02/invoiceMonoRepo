"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCustomerInvoicesUseCase = void 0;
// GetCustomerInvoicesUseCase (Clean Architecture)
const core_1 = require("@repo/core");
class GetCustomerInvoicesUseCase {
    invoiceRepository;
    outputPort;
    constructor(invoiceRepository, outputPort) {
        this.invoiceRepository = invoiceRepository;
        this.outputPort = outputPort;
    }
    async execute(customerId) {
        const invoices = await this.invoiceRepository.findByCustomerId(core_1.CustomerId.fromString(customerId));
        this.outputPort.present(invoices);
    }
}
exports.GetCustomerInvoicesUseCase = GetCustomerInvoicesUseCase;
//# sourceMappingURL=get-customer-invoices.use-case.js.map
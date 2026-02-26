"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInvoiceUseCase = void 0;
// GetInvoiceUseCase (Clean Architecture)
const core_1 = require("@repo/core");
class GetInvoiceUseCase {
    invoiceRepository;
    outputPort;
    constructor(invoiceRepository, outputPort) {
        this.invoiceRepository = invoiceRepository;
        this.outputPort = outputPort;
    }
    async execute(id) {
        const invoice = await this.invoiceRepository.findById(core_1.InvoiceId.fromString(id));
        if (!invoice) {
            throw new Error(`NOT_FOUND: Invoice with ID ${id} not found`);
        }
        this.outputPort.present(invoice);
    }
}
exports.GetInvoiceUseCase = GetInvoiceUseCase;
//# sourceMappingURL=get-invoice.use-case.js.map
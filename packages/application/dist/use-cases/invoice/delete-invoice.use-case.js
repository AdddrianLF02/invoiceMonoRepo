"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteInvoiceUseCase = void 0;
// DeleteInvoiceUseCase (Clean Architecture)
const core_1 = require("@repo/core");
class DeleteInvoiceUseCase {
    invoiceRepository;
    outputPort;
    constructor(invoiceRepository, outputPort) {
        this.invoiceRepository = invoiceRepository;
        this.outputPort = outputPort;
    }
    async execute(id) {
        // Verificar que la factura existe
        const invoice = await this.invoiceRepository.findById(core_1.InvoiceId.fromString(id));
        if (!invoice) {
            throw new Error(`NOT_FOUND: Invoice with ID ${id} not found`);
        }
        // Eliminar la factura
        await this.invoiceRepository.delete(core_1.InvoiceId.fromString(id));
        this.outputPort.present(id);
    }
}
exports.DeleteInvoiceUseCase = DeleteInvoiceUseCase;
//# sourceMappingURL=delete-invoice.use-case.js.map
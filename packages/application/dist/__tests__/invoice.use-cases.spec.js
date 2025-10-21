"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_invoice_use_case_1 = require("../use-cases/invoice/create-invoice.use-case");
const delete_invoice_use_case_1 = require("../use-cases/invoice/delete-invoice.use-case");
const get_invoice_use_case_1 = require("../use-cases/invoice/get-invoice.use-case");
const update_invoice_use_case_1 = require("../use-cases/invoice/update-invoice.use-case");
const core_1 = require("@repo/core");
class InMemoryInvoiceRepository {
    store = new Map();
    async create(invoice) {
        this.store.set(invoice.getId().toString(), invoice);
        return invoice;
    }
    async findById(id) {
        return this.store.get(id.toString()) ?? null;
    }
    async findByCustomerId(customerId) {
        return Array.from(this.store.values()).filter((i) => i.getCustomerId().toString() === customerId.toString());
    }
    async update(invoice) {
        this.store.set(invoice.getId().toString(), invoice);
        return invoice;
    }
    async delete(id) {
        this.store.delete(id.toString());
    }
}
class InMemoryUnitOfWork {
    invoiceRepository;
    customerRepository;
    UOW_TOKEN = Symbol('UOW');
    constructor(invoiceRepository, customerRepository = null) {
        this.invoiceRepository = invoiceRepository;
        this.customerRepository = customerRepository;
    }
    async executeTransaction(callback) {
        return callback();
    }
}
class SimpleTaxStrategy {
    calculate({ unitPrice, quantity, taxRate }) {
        const subtotal = unitPrice.multiply(quantity);
        const taxAmount = subtotal.multiply(taxRate / 100);
        const total = subtotal.add(taxAmount);
        return { subtotal, taxAmount, total };
    }
}
// Presenters test doubles
class CaptureInvoicePresenter {
    last = null;
    present(invoice) {
        this.last = invoice;
    }
}
class CaptureIdPresenter {
    lastId = null;
    present(id) {
        this.lastId = id;
    }
}
describe('Invoice Application Use Cases', () => {
    const customerId = core_1.CustomerId.create();
    const issueDate = new Date('2025-10-01T00:00:00.000Z');
    const dueDate = new Date('2025-11-01T00:00:00.000Z');
    let repo;
    let uow;
    let tax;
    beforeEach(() => {
        repo = new InMemoryInvoiceRepository();
        uow = new InMemoryUnitOfWork(repo);
        tax = new SimpleTaxStrategy();
    });
    it('CreateInvoiceUseCase crea y presenta la factura calculando importes', async () => {
        const presenter = new CaptureInvoicePresenter();
        const useCase = new create_invoice_use_case_1.CreateInvoiceUseCase(uow, tax, presenter);
        await useCase.execute({
            customerId: customerId.toString(),
            issueDate: issueDate.toISOString(),
            dueDate: dueDate.toISOString(),
            items: [
                { description: 'Servicio', quantity: 2, unitPrice: 100, taxRate: 21 },
                { description: 'Producto', quantity: 1, unitPrice: 50, taxRate: 10 },
            ],
        });
        expect(presenter.last).toBeTruthy();
        const saved = await repo.findById(presenter.last.getId());
        expect(saved).not.toBeNull();
        // Verificar cálculo de totales a nivel item y agregados
        const [item1, item2] = saved.getItems();
        expect(item1.getSubtotal().getAmountAsFloat()).toBe(200);
        expect(item1.getTaxAmount().getAmountAsFloat()).toBe(42);
        expect(item1.getTotal().getAmountAsFloat()).toBe(242);
        expect(item2.getSubtotal().getAmountAsFloat()).toBe(50);
        expect(item2.getTaxAmount().getAmountAsFloat()).toBe(5);
        expect(item2.getTotal().getAmountAsFloat()).toBe(55);
        // Agregados
        expect(saved.getSubtotal().getAmountAsFloat()).toBe(250);
        expect(saved.getTaxAmount().getAmountAsFloat()).toBe(47);
        expect(saved.getTotal().getAmountAsFloat()).toBe(297);
    });
    it('GetInvoiceUseCase devuelve la factura existente', async () => {
        const presenter = new CaptureInvoicePresenter();
        const useCase = new get_invoice_use_case_1.GetInvoiceUseCase(repo, presenter);
        // Seed
        const invoice = core_1.Invoice.create(customerId, issueDate, dueDate, []);
        await repo.create(invoice);
        await useCase.execute(invoice.getId().toString());
        expect(presenter.last?.getId().toString()).toBe(invoice.getId().toString());
    });
    it('UpdateInvoiceUseCase actualiza status e items recalculando importes', async () => {
        const presenter = new CaptureInvoicePresenter();
        const useCase = new update_invoice_use_case_1.UpdateInvoiceUseCase(repo, tax, presenter);
        // Seed base invoice
        const base = core_1.Invoice.create(customerId, issueDate, dueDate, []);
        await repo.create(base);
        await useCase.execute(base.getId().toString(), {
            status: 'PAID',
            items: [
                { description: 'Nuevo item', quantity: 3, unitPrice: 20, taxRate: 21 },
            ],
        });
        expect(presenter.last).toBeTruthy();
        const updated = presenter.last;
        expect(updated.getStatus().getValue()).toBe(core_1.InvoiceStatus.paid().getValue());
        expect(updated.getItems().length).toBe(1);
        const itm = updated.getItems()[0];
        expect(itm.getSubtotal().getAmountAsFloat()).toBe(60);
        expect(itm.getTaxAmount().getAmountAsFloat()).toBe(12.6);
        expect(itm.getTotal().getAmountAsFloat()).toBe(72.6);
    });
    it('DeleteInvoiceUseCase elimina la factura y presenta el id', async () => {
        const presenter = new CaptureIdPresenter();
        const useCase = new delete_invoice_use_case_1.DeleteInvoiceUseCase(repo, presenter);
        const inv = core_1.Invoice.create(customerId, issueDate, dueDate, []);
        await repo.create(inv);
        await useCase.execute(inv.getId().toString());
        expect(presenter.lastId).toBe(inv.getId().toString());
        const exists = await repo.findById(inv.getId());
        expect(exists).toBeNull();
    });
    it('GetInvoiceUseCase lanza NotFound si no existe', async () => {
        const presenter = new CaptureInvoicePresenter();
        const useCase = new get_invoice_use_case_1.GetInvoiceUseCase(repo, presenter);
        await expect(useCase.execute('00000000-0000-0000-0000-000000000000')).rejects.toThrow();
    });
    it('DeleteInvoiceUseCase lanza NotFound si no existe', async () => {
        const presenter = new CaptureIdPresenter();
        const useCase = new delete_invoice_use_case_1.DeleteInvoiceUseCase(repo, presenter);
        await expect(useCase.execute('00000000-0000-0000-0000-000000000000')).rejects.toThrow();
    });
});
//# sourceMappingURL=invoice.use-cases.spec.js.map
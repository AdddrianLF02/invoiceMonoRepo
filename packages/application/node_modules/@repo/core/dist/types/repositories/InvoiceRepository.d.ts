import { Invoice } from "../entities/Invoice";
import { InvoiceId } from "../value-objects/InvoiceId";
import { CustomerId } from "../value-objects/CustomerId";
export interface InvoiceRepository {
    create(invoice: Invoice): Promise<Invoice>;
    findById(id: InvoiceId): Promise<Invoice | null>;
    findByCustomerId(customerId: CustomerId): Promise<Invoice[]>;
    update(invoice: Invoice): Promise<Invoice>;
    delete(id: InvoiceId): Promise<void>;
}
//# sourceMappingURL=InvoiceRepository.d.ts.map
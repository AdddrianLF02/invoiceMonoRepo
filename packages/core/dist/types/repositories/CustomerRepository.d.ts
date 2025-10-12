import { Customer } from "../entities/Customer";
import { CustomerId } from "../value-objects/CustomerId";
import { Email } from "../value-objects/Email";
export interface CustomerRepository {
    create(customer: Customer): Promise<Customer>;
    findById(id: CustomerId): Promise<Customer | null>;
    findByEmail(email: Email): Promise<Customer | null>;
    update(customer: Customer): Promise<Customer>;
}
//# sourceMappingURL=CustomerRepository.d.ts.map
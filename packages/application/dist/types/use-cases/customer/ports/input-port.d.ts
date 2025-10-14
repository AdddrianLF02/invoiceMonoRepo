import { Customer } from "@repo/core";
import { CreateCustomerInput } from "../create-customer.use-case";
import { UpdateCustomerInput } from "../update-customer.use-case";
export interface CreateCustomerInputPort {
    execute(input: CreateCustomerInput): Promise<Customer>;
}
export interface GetCustomerByEmailInputPort {
    execute(email: string): Promise<Customer | null>;
}
export interface GetCustomerByIdInputPort {
    execute(id: string): Promise<Customer | null>;
}
export interface UpdateCustomerInputPort {
    execute(input: UpdateCustomerInput): Promise<Customer>;
}
//# sourceMappingURL=input-port.d.ts.map
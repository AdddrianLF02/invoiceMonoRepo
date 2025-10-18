import { Customer } from "@repo/core";
import { CreateCustomerInput } from "../create-customer.use-case";
import { UpdateCustomerInput } from "../update-customer.use-case";
export declare const CREATE_CUSTOMER_INPUT_TOKEN = "CREATE_CUSTOMER_INPUT_TOKEN";
export interface CreateCustomerInputPort {
    execute(input: CreateCustomerInput): Promise<Customer>;
}
export declare const GET_CUSTOMER_BY_EMAIL_INPUT_TOKEN = "GET_CUSTOMER_BY_EMAIL_INPUT_TOKEN";
export interface GetCustomerByEmailInputPort {
    execute(email: string): Promise<Customer | null>;
}
export declare const GET_CUSTOMER_BY_ID_INPUT_TOKEN = "GET_CUSTOMER_BY_ID_INPUT_TOKEN";
export interface GetCustomerByIdInputPort {
    execute(id: string): Promise<Customer | null>;
}
export declare const UPDATE_CUSTOMER_INPUT_PORT = "UPDATE_CUSTOMER_INPUT_TOKEN";
export interface UpdateCustomerInputPort {
    execute(input: UpdateCustomerInput): Promise<Customer>;
}
//# sourceMappingURL=input-port.d.ts.map
import { Customer } from "@repo/core";
export declare const CREATE_CUSTOMER_OUTPUT_TOKEN = "CREATE_CUSTOMER_OUTPUT_TOKEN";
export interface CreateCustomerOutputPort {
    present(customer: Customer): void;
}
export declare const GET_CUSTOMER_BY_EMAIL_OUTPUT_TOKEN = "GET_CUSTOMER_BY_EMAIL_OUTPUT_TOKEN";
export interface GetCustomerByEmailOutputPort {
    present(customer: Customer | null): void;
}
export declare const GET_CUSTOMER_BY_ID_OUTPUT_TOKEN = "GET_CUSTOMER_BY_ID_OUTPUT_TOKEN";
export interface GetCustomerByIdOutputPort {
    present(customer: Customer | null): void;
}
export declare const UPDATE_CUSTOMER_OUTPUT_TOKEN = "UPDATE_CUSTOMER_OUTPUT_TOKEN";
export interface UpdateCustomerOutputPort {
    present(customer: Customer): void;
}
export declare const GET_ALL_CUSTOMERS_OUTPUT_TOKEN = "GET_ALL_CUSTOMERS_OUTPUT_TOKEN";
export interface GetAllCustomersOutputPort {
    present(customers: Customer[]): void;
}
//# sourceMappingURL=output-port.d.ts.map
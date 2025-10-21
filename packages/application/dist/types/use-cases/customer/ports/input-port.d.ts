import { CreateCustomerDto, UpdateCustomerDto } from "../../../dtos/customer.zod";
export declare const CREATE_CUSTOMER_INPUT_TOKEN = "CREATE_CUSTOMER_INPUT_TOKEN";
export interface CreateCustomerInputPort {
    execute(input: CreateCustomerDto): Promise<void>;
}
export declare const GET_CUSTOMER_BY_EMAIL_INPUT_TOKEN = "GET_CUSTOMER_BY_EMAIL_INPUT_TOKEN";
export interface GetCustomerByEmailInputPort {
    execute(email: string): Promise<void>;
}
export declare const GET_CUSTOMER_BY_ID_INPUT_TOKEN = "GET_CUSTOMER_BY_ID_INPUT_TOKEN";
export interface GetCustomerByIdInputPort {
    execute(id: string): Promise<void>;
}
export declare const UPDATE_CUSTOMER_INPUT_TOKEN = "UPDATE_CUSTOMER_INPUT_TOKEN";
export interface UpdateCustomerInputPort {
    execute(input: UpdateCustomerDto): Promise<void>;
}
//# sourceMappingURL=input-port.d.ts.map
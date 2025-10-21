import { Customer } from "@repo/core";
import { CreateCustomerDto, UpdateCustomerDto } from "../../../dtos/customer.zod";

export const CREATE_CUSTOMER_INPUT_TOKEN = "CREATE_CUSTOMER_INPUT_TOKEN";
export interface CreateCustomerInputPort {
    execute(input: CreateCustomerDto): Promise<void>;
}

export const GET_CUSTOMER_BY_EMAIL_INPUT_TOKEN = "GET_CUSTOMER_BY_EMAIL_INPUT_TOKEN";
export interface GetCustomerByEmailInputPort {
  execute(email: string): Promise<Customer | null>;
}

export const GET_CUSTOMER_BY_ID_INPUT_TOKEN = "GET_CUSTOMER_BY_ID_INPUT_TOKEN";
export interface GetCustomerByIdInputPort {
  execute(id: string): Promise<Customer | null>;
}


export const UPDATE_CUSTOMER_INPUT_PORT = "UPDATE_CUSTOMER_INPUT_TOKEN";
export interface UpdateCustomerInputPort {
  execute(input: UpdateCustomerDto): Promise<void>;
}

import { Customer } from "@repo/core";

export interface CreateCustomerOutputPort {
    handle(result: Customer): void;
}

export interface GetCustomerByEmailOutputPort {
  handle(result: Customer | null): void;
}


export interface GetCustomerByIdOutputPort {
  handle(result: Customer | null): void;
}


export interface UpdateCustomerOutputPort {
  handle(result: Customer): void;
}

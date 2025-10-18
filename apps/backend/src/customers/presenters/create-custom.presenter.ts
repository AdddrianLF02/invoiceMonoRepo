import { Inject, Injectable, Scope } from "@nestjs/common";
import { CreateCustomerOutputPort } from "@repo/application";
import type { Response } from "express";
import { CustomerMapper } from "../mappers/customer.mapper";
import { Customer } from "@repo/core";

@Injectable({ scope: Scope.REQUEST })
export class CreateCustomerPresenter implements CreateCustomerOutputPort {
    constructor(
        @Inject('EXPRESS_RESPONSE') private readonly res: Response
    ) {}

    present(customer: Customer): void {
        const dto = CustomerMapper.toResponse(customer);
        this.res.status(201).json(dto)
    }
}
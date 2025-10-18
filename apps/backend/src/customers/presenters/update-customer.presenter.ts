import { Inject, Injectable, Scope } from "@nestjs/common";
import { UpdateCustomerOutputPort } from "@repo/application";
import { Customer } from "@repo/core";
import type { Response } from "express";
import { CustomerMapper } from "../mappers/customer.mapper";

@Injectable({ scope: Scope.REQUEST })
export class UpdateCustomerPresenter implements UpdateCustomerOutputPort {
    constructor(
        @Inject('EXPRESS_RESPONSE') private readonly res: Response
    ) {}

    present(customer: Customer): void {
        const dto = CustomerMapper.toResponse(customer)
        this.res.status(201).json(dto)
    }
}
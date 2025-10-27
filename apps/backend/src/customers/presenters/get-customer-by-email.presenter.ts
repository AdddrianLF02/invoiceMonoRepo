import { Inject, Injectable, Scope } from "@nestjs/common";
import { GetCustomerByEmailOutputPort } from "@repo/application";
import { Customer } from "@repo/core";
import type { Response } from "express";
import { CustomerMapper } from "../mappers/customer.mapper";

@Injectable({ scope: Scope.REQUEST })
export class GetCustomerByEmailPresenter implements GetCustomerByEmailOutputPort {
    constructor(
        @Inject('EXPRESS_RESPONSE') private readonly res: Response
    ) {}

    present(customer: Customer): void {
        // Evitar enviar respuesta si ya fue enviada
        if (this.res.headersSent) return;
        const dto = CustomerMapper.toResponse(customer);
        this.res.status(201).json(dto);
    }
}
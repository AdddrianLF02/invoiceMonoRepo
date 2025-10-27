import { Inject, Injectable, Scope } from "@nestjs/common";
import { GetAllCustomersOutputPort } from "@repo/application";
import { Customer } from "@repo/core";
import type { Response } from "express";
import { CustomerMapper } from "../mappers/customer.mapper";

@Injectable({ scope: Scope.REQUEST })
export class GetAllCustomersPresenter implements GetAllCustomersOutputPort {
    constructor(
        @Inject('EXPRESS_RESPONSE') private readonly res: Response
    ) {}

    present(customers: Customer[]): void {
        // Evitar enviar respuesta si ya fue enviada
        if (this.res.headersSent) return;
        const dtos = customers.map(customer => CustomerMapper.toResponse(customer));
        this.res.status(200).json(dtos);
    }
}
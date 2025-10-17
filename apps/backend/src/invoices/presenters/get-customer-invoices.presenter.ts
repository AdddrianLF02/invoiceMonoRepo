import { Inject, Injectable, Scope } from "@nestjs/common";
import { GetCustomerInvoicesOutputPort } from "@repo/application";
import type { Response } from "express";
import { Invoice } from "@repo/core";
import { InvoiceResponseSwaggerDto } from "../invoice-swagger.dto";
import { InvoiceMapper } from "../mappers/invoice.mapper";

@Injectable({ scope: Scope.REQUEST })
export class GetCustomerInvoicesPresenter implements GetCustomerInvoicesOutputPort {
    constructor(
        @Inject('EXPRESS_RESPONSE') private readonly res: Response
    ) {}

    present(invoices: Invoice[]): void {
        const dtos = invoices.map((i) => InvoiceMapper.toResponse(i));
        this.res.status(200).json(dtos);
    }
}
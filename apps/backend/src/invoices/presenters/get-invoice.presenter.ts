import { Inject, Injectable, Scope } from "@nestjs/common";
import { GetInvoiceOutPutPort } from "@repo/application";
import type { Response } from "express";
import { Invoice } from "@repo/core";
import { InvoiceMapper } from "../mappers/invoice.mapper";

@Injectable({ scope: Scope.REQUEST })
export class GetInvoicePresenter implements GetInvoiceOutPutPort {
    constructor(@Inject('EXPRESS_RESPONSE') private readonly res: Response) {}

    present(invoice: Invoice): void {
        const dto = InvoiceMapper.toResponse(invoice);
        this.res.status(200).json(dto);
    }
}
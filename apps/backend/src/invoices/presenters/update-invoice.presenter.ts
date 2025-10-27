import { Inject, Injectable, Scope } from "@nestjs/common";
import type { Response } from "express";
import { InvoiceResponseSwaggerDto } from "../dtos/invoice-swagger.dto";
import { Invoice } from "@repo/core";
import { InvoiceMapper } from "../mappers/invoice.mapper";
import { UpdateInvoiceOutputPort } from "@repo/application";

@Injectable({ scope: Scope.REQUEST })
export class UpdateInvoicePresenter implements UpdateInvoiceOutputPort {
    constructor(
        @Inject('EXPRESS_RESPONSE') private readonly res: Response
    ) {}

    present(invoice: Invoice): void {
        // Evitar enviar respuesta si ya fue enviada
        if (this.res.headersSent) return;
        const dto = InvoiceMapper.toResponse(invoice);
        this.res.status(200).json(dto);
    }
}
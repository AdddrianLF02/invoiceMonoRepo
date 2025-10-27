import { Inject, Injectable, Scope } from "@nestjs/common";
import { DeleteInvoiceOutputPort } from "@repo/application";
import type { Response } from "express";

@Injectable({ scope: Scope.REQUEST })
export class DeleteInvoicePresenter implements DeleteInvoiceOutputPort {
    constructor(
        @Inject('EXPRESS_RESPONSE') private readonly res: Response
    ) {}

     present(id: string): void {
        // Evitar enviar respuesta si ya fue enviada
        if (this.res.headersSent) return;
        this.res.status(200).json({
        message: `Invoice ${id} deleted successfully`,
        });
  }
}
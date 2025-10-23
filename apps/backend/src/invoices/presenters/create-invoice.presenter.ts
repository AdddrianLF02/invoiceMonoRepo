import { Inject, Injectable, Scope } from "@nestjs/common";
import { CreateInvoiceOutputPort } from "@repo/application";
import type { Response } from "express";
import { Invoice } from "@repo/core";
import { InvoiceMapper } from "../mappers/invoice.mapper";

@Injectable({ scope: Scope.REQUEST })
export class CreateInvoicePresenter implements CreateInvoiceOutputPort {
  constructor(
    @Inject('EXPRESS_RESPONSE') private readonly res: Response
  ) {}

  present(invoice: Invoice): void {
    try {
      const dto = InvoiceMapper.toResponse(invoice);
      this.res.status(201).json(dto);
    } catch (error) {
      const err = error as Error
      this.res.status(500).json({ message: 'Error creating invoice', error: err.message });
    }
}
}
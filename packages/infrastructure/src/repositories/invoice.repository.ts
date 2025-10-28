import { Injectable } from '@nestjs/common';
import {
  Invoice,
  type InvoiceRepository,
  InvoiceId,
  CustomerId,
  InvoiceItem,
  Money,
  InvoiceNumber,
  InvoiceStatus as DomainInvoiceStatus, // Renombramos para evitar colisión
} from '@repo/core';
import { PrismaService } from '../database/prisma.service'; // Ruta relativa corregida
import { Prisma, InvoiceStatus as PrismaInvoiceStatus } from '@prisma/client'; // Importación correcta

// Tipo que puede ser el cliente estándar o el cliente de transacción de Prisma
export type PrismaClientOrTx = PrismaService | Prisma.TransactionClient;

@Injectable()
export class PrismaInvoiceRepository implements InvoiceRepository {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(invoice: Invoice): Promise<Invoice> {
    const createdInvoiceData = await this.prisma.invoice.create({
      data: {
        id: invoice.getId().getValue(),
        customerId: invoice.getCustomerId().getValue(),
        invoiceNumber: invoice.getInvoiceNumber().getValue(),
        status: invoice.getStatus().getValue() as PrismaInvoiceStatus,
        issueDate: invoice.getIssueDate(),
        dueDate: invoice.getDueDate(),
        items: {
          create: invoice.getItems().map((item) => ({
            id: item.getId(),
            description: item.getDescription(),
            quantity: item.getQuantity(),
            unitPrice: item.getUnitPrice().getAmountInCents(),
            taxRate: item.getTaxRate(),
            subtotal: item.getSubtotal().getAmountInCents(),
            taxAmount: item.getTaxAmount().getAmountInCents(),
            total: item.getTotal().getAmountInCents()
          })),
        },
      },
      include: { items: true },
    });

    return this.mapToDomain(createdInvoiceData);
  }

  async findById(id: InvoiceId): Promise<Invoice | null> {
    const invoiceData = await this.prisma.invoice.findUnique({
      where: { id: id.getValue() },
      include: { items: true },
    });

    if (!invoiceData) {
      return null;
    }

    return this.mapToDomain(invoiceData);
  }

  async findByCustomerId(customerId: CustomerId): Promise<Invoice[]> {
    const invoicesData = await this.prisma.invoice.findMany({
      where: { customerId: customerId.getValue() },
      include: { items: true },
    });

    return invoicesData.map((invoiceData) => this.mapToDomain(invoiceData));
  }

  async update(invoice: Invoice): Promise<Invoice> {
    const updatedInvoiceData = await this.prisma.invoice.update({
      where: { id: invoice.getId().getValue() },
      data: {
        customerId: invoice.getCustomerId().getValue(),
        invoiceNumber: invoice.getInvoiceNumber().getValue(),
        status: invoice.getStatus().getValue() as PrismaInvoiceStatus,
        issueDate: invoice.getIssueDate(),
        dueDate: invoice.getDueDate(),
        items: {
          deleteMany: {},
          create: invoice.getItems().map((item) => ({
            id: item.getId(),
            description: item.getDescription(),
            quantity: item.getQuantity(),
            unitPrice: item.getUnitPrice().getAmountInCents(),
            taxRate: item.getTaxRate(),
            subtotal: item.getSubtotal().getAmountInCents(),
            taxAmount: item.getTaxAmount().getAmountInCents(),
            total: item.getTotal().getAmountInCents()
          })),
        },
      },
      include: { items: true },
    });

    return this.mapToDomain(updatedInvoiceData);
  }

  async delete(id: InvoiceId): Promise<void> {
    // Las operaciones en cascada deben configurarse en el schema de Prisma
    await this.prisma.invoiceItem.deleteMany({
      where: { invoiceId: id.getValue() },
    });
    await this.prisma.invoice.delete({
      where: { id: id.getValue() },
    });
  }

  private mapToDomain(invoiceData: any): Invoice {
    const invoiceItems = invoiceData.items.map((item: any) => {
      // unitPrice, subtotal, taxAmount y total vienen de la base de datos en céntimos (BigInt)
      // Convertimos explícitamente a número y a valor decimal donde corresponde.
      const unitPriceMoney = Money.fromFloat(Number(item.unitPrice) / 100, 'EUR');
      const subtotalInCents = Number(item.subtotal);
      const taxAmountInCents = Number(item.taxAmount);
      const totalInCents = Number(item.total);

      return InvoiceItem.reconstitute(
        item.id,
        item.description,
        item.quantity,
        unitPriceMoney,
        item.taxRate,
        subtotalInCents,
        taxAmountInCents,
        totalInCents
      );
    });

    if (!invoiceData.dueDate) {
      throw new Error(
        `La factura con ID ${invoiceData.id} no tiene fecha de vencimiento en la base de datos.`,
      );
    }

    return Invoice.reconstitute(
      InvoiceId.fromString(invoiceData.id),
      CustomerId.fromString(invoiceData.customerId),
      InvoiceNumber.create(invoiceData.invoiceNumber),
      DomainInvoiceStatus.fromString(invoiceData.status),
      invoiceData.issueDate,
      invoiceData.dueDate,
      invoiceItems,
      invoiceData.createdAt,
      invoiceData.updatedAt,
    );
  }
}

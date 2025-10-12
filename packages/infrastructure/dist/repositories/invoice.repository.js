"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaInvoiceRepository = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@repo/core");
const prisma_service_1 = require("../database/prisma.service"); // Ruta relativa corregida
let PrismaInvoiceRepository = class PrismaInvoiceRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(invoice) {
        const createdInvoiceData = await this.prisma.invoice.create({
            data: {
                id: invoice.getId().getValue(),
                customerId: invoice.getCustomerId().getValue(),
                invoiceNumber: invoice.getInvoiceNumber().getValue(),
                status: invoice.getStatus().getValue(),
                issueDate: invoice.getIssueDate(),
                dueDate: invoice.getDueDate(),
                items: {
                    create: invoice.getItems().map((item) => ({
                        id: item.getId(),
                        description: item.getDescription(),
                        quantity: item.getQuantity(),
                        unitPrice: item.getUnitPrice().getAmount(),
                        taxRate: item.getTaxRate(),
                    })),
                },
            },
            include: { items: true },
        });
        return this.mapToDomain(createdInvoiceData);
    }
    async findById(id) {
        const invoiceData = await this.prisma.invoice.findUnique({
            where: { id: id.getValue() },
            include: { items: true },
        });
        if (!invoiceData) {
            return null;
        }
        return this.mapToDomain(invoiceData);
    }
    async findByCustomerId(customerId) {
        const invoicesData = await this.prisma.invoice.findMany({
            where: { customerId: customerId.getValue() },
            include: { items: true },
        });
        return invoicesData.map((invoiceData) => this.mapToDomain(invoiceData));
    }
    async update(invoice) {
        const updatedInvoiceData = await this.prisma.invoice.update({
            where: { id: invoice.getId().getValue() },
            data: {
                customerId: invoice.getCustomerId().getValue(),
                invoiceNumber: invoice.getInvoiceNumber().getValue(),
                status: invoice.getStatus().getValue(),
                issueDate: invoice.getIssueDate(),
                dueDate: invoice.getDueDate(),
                items: {
                    deleteMany: {},
                    create: invoice.getItems().map((item) => ({
                        id: item.getId(),
                        description: item.getDescription(),
                        quantity: item.getQuantity(),
                        unitPrice: item.getUnitPrice().getAmount(),
                        taxRate: item.getTaxRate(),
                    })),
                },
            },
            include: { items: true },
        });
        return this.mapToDomain(updatedInvoiceData);
    }
    async delete(id) {
        // Las operaciones en cascada deben configurarse en el schema de Prisma
        await this.prisma.invoiceItem.deleteMany({
            where: { invoiceId: id.getValue() },
        });
        await this.prisma.invoice.delete({
            where: { id: id.getValue() },
        });
    }
    mapToDomain(invoiceData) {
        const invoiceItems = invoiceData.items.map((item) => core_1.InvoiceItem.reconstitute(item.id, item.description, item.quantity, core_1.Money.create(item.unitPrice, 'EUR'), item.taxRate));
        if (!invoiceData.dueDate) {
            throw new Error(`La factura con ID ${invoiceData.id} no tiene fecha de vencimiento en la base de datos.`);
        }
        return core_1.Invoice.reconstitute(core_1.InvoiceId.fromString(invoiceData.id), core_1.CustomerId.fromString(invoiceData.customerId), core_1.InvoiceNumber.create(invoiceData.invoiceNumber), core_1.InvoiceStatus.fromString(invoiceData.status), invoiceData.issueDate, invoiceData.dueDate, invoiceItems, invoiceData.createdAt, invoiceData.updatedAt);
    }
};
exports.PrismaInvoiceRepository = PrismaInvoiceRepository;
exports.PrismaInvoiceRepository = PrismaInvoiceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaInvoiceRepository);
//# sourceMappingURL=invoice.repository.js.map
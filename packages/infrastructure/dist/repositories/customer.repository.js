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
exports.PrismaCustomerRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const core_1 = require("@repo/core");
let PrismaCustomerRepository = class PrismaCustomerRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(customer) {
        let addressStr = '';
        if (customer.getAddress()) {
            const addr = customer.getAddress();
            addressStr = [
                addr?.getStreet(),
                addr?.getCity(),
                addr?.getPostalCode(),
                addr?.getCountry()
            ].filter(Boolean).join(', ');
        }
        await this.prisma.customer.create({
            data: {
                id: customer.getId().getValue(),
                userId: customer.getUserId().getValue(), // <-- AÑADIDO
                name: customer.getName(),
                email: customer.getEmail().getValue(),
                phone: customer.getNumber() || null,
                address: addressStr || null
            },
        });
        return customer;
    }
    async findById(id) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: id.getValue() },
        });
        if (!customer)
            return null;
        const customerId = core_1.CustomerId.fromString(customer.id);
        const userId = core_1.UserId.fromString(customer.userId); // <-- AÑADIDO
        const email = core_1.Email.create(customer.email);
        let address = undefined;
        if (customer.address) {
            const addressParts = customer.address.split(', ');
            address = core_1.Address.create(addressParts[0] || '', addressParts[1] || '', addressParts[2] || '', addressParts[3] || '');
        }
        return core_1.Customer.reconstitute(customerId, userId, // <-- AÑADIDO
        customer.name, email, customer.phone || '', address || core_1.Address.create('', '', '', ''), core_1.TaxId.create(''), true, customer.createdAt, customer.updatedAt);
    }
    async findByEmail(email) {
        const customer = await this.prisma.customer.findUnique({
            where: { email: email.getValue() },
        });
        if (!customer)
            return null;
        const customerId = core_1.CustomerId.fromString(customer.id);
        const userId = core_1.UserId.fromString(customer.userId); // <-- AÑADIDO
        const customerEmail = core_1.Email.create(customer.email);
        let address = undefined;
        if (customer.address) {
            const addressParts = customer.address.split(', ');
            address = core_1.Address.create(addressParts[0] || '', addressParts[1] || '', addressParts[2] || '', addressParts[3] || '');
        }
        return core_1.Customer.reconstitute(customerId, userId, // <-- AÑADIDO
        customer.name, customerEmail, customer.phone || '', address || core_1.Address.create('', '', '', ''), core_1.TaxId.create(''), true, customer.createdAt, customer.updatedAt);
    }
    async update(customer) {
        let addressStr = '';
        if (customer.getAddress()) {
            const addr = customer.getAddress();
            addressStr = [
                addr?.getStreet(),
                addr?.getCity(),
                addr?.getPostalCode(),
                addr?.getCountry()
            ].filter(Boolean).join(', ');
        }
        await this.prisma.customer.update({
            where: { id: customer.getId().getValue() },
            data: {
                name: customer.getName(),
                email: customer.getEmail().getValue(),
                phone: customer.getNumber() || null,
                address: addressStr || null,
                userId: customer.getUserId().getValue(), // <-- AÑADIDO
            },
        });
        return customer;
    }
};
exports.PrismaCustomerRepository = PrismaCustomerRepository;
exports.PrismaCustomerRepository = PrismaCustomerRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaCustomerRepository);
//# sourceMappingURL=customer.repository.js.map
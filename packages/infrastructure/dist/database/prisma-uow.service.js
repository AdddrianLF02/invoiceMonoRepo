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
exports.PrismaUnitOfWork = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@repo/core");
const prisma_service_1 = require("./prisma.service");
const invoice_repository_1 = require("../repositories/invoice.repository");
const customer_repository_1 = require("../repositories/customer.repository");
const user_repository_1 = require("../repositories/user.repository");
let PrismaUnitOfWork = class PrismaUnitOfWork {
    prisma;
    UOW_TOKEN = core_1.UNIT_OF_WORK;
    // INICIALIZACIÓN DE REPOSITORIOS
    invoiceRepository;
    customerRepository;
    userRepository;
    // Inyectamos el servicio Prisma ( que es el cliente )
    constructor(prisma) {
        this.prisma = prisma;
        // INICIALIZAMOS CON EL CLIENTE BASE ( SIN TRANSACCIÓN )
        this.invoiceRepository = new invoice_repository_1.PrismaInvoiceRepository(this.prisma);
        this.customerRepository = new customer_repository_1.PrismaCustomerRepository(this.prisma);
        this.userRepository = new user_repository_1.PrismaUserRepository(this.prisma);
    }
    async executeTransaction(callback) {
        // Ejecuta la transacción de Prisma, obteniendo un cliente transaccional
        return this.prisma.$transaction(async (tx) => {
            // Reemplaza los repositorios con versiones que usan el cliente transaccional
            this.invoiceRepository = new invoice_repository_1.PrismaInvoiceRepository(tx);
            this.customerRepository = new customer_repository_1.PrismaCustomerRepository(tx);
            this.userRepository = new user_repository_1.PrismaUserRepository(tx);
            // Ejecuta el Caso de Uso (callback)
            return callback();
        });
    }
};
exports.PrismaUnitOfWork = PrismaUnitOfWork;
exports.PrismaUnitOfWork = PrismaUnitOfWork = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }) // [CRÍTICO] Debe ser Request-Scope
    ,
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUnitOfWork);
//# sourceMappingURL=prisma-uow.service.js.map
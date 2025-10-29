import { Controller, Get, UseGuards, Inject, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import type { IUnitOfWork } from '@repo/core';
import { UNIT_OF_WORK, UserId } from '@repo/core';


@ApiTags('Dashboard')
@Controller('dashboard')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(
    @Inject(UNIT_OF_WORK) private readonly uow: IUnitOfWork,
  ) {}
  
  @Get('stats')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Return dashboard statistics' })
  async getDashboardStats(@Req() req: any) {
    const userId = UserId.fromString(req.user.sub);

    // Obtener clientes del usuario
    const customers = await this.uow.customerRepository.findByUserId(userId);
    const totalCustomers = customers.length;

    // Agregar facturas de todos los clientes del usuario
    let totalInvoices = 0;
    let totalRevenueCents = 0n;

    for (const customer of customers) {
      const invoices = await this.uow.invoiceRepository.findByCustomerId(customer.getId());
      totalInvoices += invoices.length;
      for (const inv of invoices) {
        totalRevenueCents += inv.getTotal().getAmountInCents();
      }
    }

    const totalRevenue = Number(totalRevenueCents) / 100;

    // Por ahora, growthRate simple (placeholder). Se puede calcular por periodos.
    const growthRate = 0;

    return {
      totalRevenue,
      totalInvoices,
      totalCustomers,
      growthRate,
    };
  }

  @Get('recent-invoices')
  @ApiOperation({ summary: 'Get recent invoices' })
  @ApiResponse({ status: 200, description: 'Return recent invoices' })
  async getRecentInvoices(@Req() req: any) {
    const userId = UserId.fromString(req.user.sub);

    // Obtener clientes y hacer un mapa id->nombre
    const customers = await this.uow.customerRepository.findByUserId(userId);
    const customerNameById = new Map<string, string>();
    for (const c of customers) {
      customerNameById.set(c.getId().getValue(), c.getName());
    }

    // Obtener todas las facturas de estos clientes
    const allInvoices = [] as any[];
    for (const c of customers) {
      const invoices = await this.uow.invoiceRepository.findByCustomerId(c.getId());
      allInvoices.push(...invoices);
    }

    // Ordenar por fecha de creación descendente
    allInvoices.sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime());

    // Mapear a resumen esperado por el frontend
    const recent = allInvoices.slice(0, 10).map(inv => {
      const id = inv.getId().getValue();
      const number = inv.getInvoiceNumber().getValue();
      const clientName = customerNameById.get(inv.getCustomerId().getValue()) ?? 'Unknown';
      const amount = inv.getTotal().getAmountAsFloat();
      const date = inv.getIssueDate().toISOString().slice(0, 10);
      const s = inv.getStatus();
      const status = s.isPaid()
        ? 'paid'
        : s.isOverdue()
          ? 'overdue'
          : s.isCancelled()
            ? 'cancelled'
            : s.isDraft()
              ? 'draft'
              : 'pending';

      return { id, number, clientName, amount, status, date };
    });

    return recent;
  }
}
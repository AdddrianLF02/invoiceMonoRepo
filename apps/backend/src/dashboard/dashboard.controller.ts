import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@ApiTags('Dashboard')
@Controller('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class DashboardController {
  
  @Get('stats')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Return dashboard statistics' })
  async getDashboardStats() {
    // En un caso real, obtendríamos estos datos de los repositorios
    // Por ahora, devolvemos datos de ejemplo
    return {
      totalRevenue: 12345.67,
      totalInvoices: 42,
      totalCustomers: 18,
      growthRate: 12.5
    };
  }

  @Get('recent-invoices')
  @ApiOperation({ summary: 'Get recent invoices' })
  @ApiResponse({ status: 200, description: 'Return recent invoices' })
  async getRecentInvoices() {
    // En un caso real, obtendríamos estos datos del repositorio de facturas
    // Por ahora, devolvemos datos de ejemplo
    return [
      {
        id: '1',
        number: 'INV-0001',
        clientName: 'Acme Inc.',
        amount: 1200.00,
        status: 'paid',
        date: '2023-10-12'
      },
      {
        id: '2',
        number: 'INV-0002',
        clientName: 'Globex Corp',
        amount: 850.50,
        status: 'pending',
        date: '2023-10-15'
      },
      {
        id: '3',
        number: 'INV-0003',
        clientName: 'Stark Industries',
        amount: 3200.75,
        status: 'overdue',
        date: '2023-10-05'
      }
    ];
  }
}
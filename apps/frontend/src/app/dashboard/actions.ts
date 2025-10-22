'use server'

// Interfaces para los datos
interface DashboardStats {
    totalRevenue: number;
    totalInvoices: number;
    totalCustomers: number;
    growthRate: string;
}

export interface InvoiceSummary {
    id: string;
    number: string;
    clientName: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
    date: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

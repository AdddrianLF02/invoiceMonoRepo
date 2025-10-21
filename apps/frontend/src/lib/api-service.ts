import { Customer, Invoice } from "./types";

// URL base para las API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Interface para los datos del dashboard
export interface DashboardStats {
    totalRevenue: number;
    totalInvoices: number;
    totalCustomers: number;
    growthRate: number;
}

export interface InvoiceSummary {
    id: string;
    number: string;
    clientName: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
    date: string;
}

// Función para obtener las estadísticas del dashboard
export async function getDashboardStats(accessToken: string): Promise<DashboardStats> {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok) {
            throw new Error('Failed to fetch dashboard stats');
        }

        return await response.json();
    } catch(error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
}

export async function getRecentInvoices(accessToken: string): Promise<InvoiceSummary[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/invoices/recent`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok) {
            throw new Error('Failed to fetch recent invoices');
        }

        return await response.json();
    } catch(error) {
        console.error('Error fetching recent invoices:', error);
        throw error;
    }
}

// Función para obtener todas las facturas
export async function getAllInvoices(accessToken: string): Promise<Invoice[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/invoices/all`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok) {
            throw new Error('Failed to fetch all invoices');
        }

        return await response.json();
    } catch(error) {
        console.error('Error fetching all invoices:', error);
        throw error;
    }
}

// Función para obtener una factura por ID
export async function getInvoiceById(accessToken: string, invoiceId: string): Promise<Invoice> {
    try {
        const response = await fetch(`${API_BASE_URL}/invoices/${invoiceId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok) {
            throw new Error('Failed to fetch invoice');
        }

        return await response.json();
    } catch(error) {
        console.error('Error fetching invoice:', error);
        throw error;
    }
}

// Función para obtener todos los clientes
export async function getAllCustomers(accessToken: string): Promise<Customer[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/customers/all`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok) {
            throw new Error('Failed to fetch all customers');
        }

        return await response.json();
    } catch(error) {
        console.error('Error fetching all customers:', error);
        throw error;
    }
}

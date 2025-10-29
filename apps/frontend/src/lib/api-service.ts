import { Customer, Invoice } from "./types";

// URL base para las API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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
    status: 'paid' | 'pending' | 'overdue' | 'cancelled' | 'draft';
    date: string;
    // Nuevos campos opcionales expuestos por el backend
    createdAt?: string;
    dueDate?: string;
}

// Función para obtener las estadísticas del dashboard
export async function getDashboardStats(accessToken: string): Promise<DashboardStats> {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok) {
            console.warn(`Failed to fetch dashboard stats: ${response.status} ${response.statusText}`);
            // Fallback seguro para permitir renderizar el dashboard sin romper la página
            return {
                totalRevenue: 0,
                totalInvoices: 0,
                totalCustomers: 0,
                growthRate: 0,
            };
        }

        return await response.json();
    } catch(error) {
        console.error('Error fetching dashboard stats:', error);
        // Fallback en caso de error de red/servidor
        return {
            totalRevenue: 0,
            totalInvoices: 0,
            totalCustomers: 0,
            growthRate: 0,
        };
    }
}

export async function getRecentInvoices(accessToken: string): Promise<InvoiceSummary[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/recent-invoices`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok) {
            console.warn(`Failed to fetch recent invoices: ${response.status} ${response.statusText}`);
            return [];
        }

        return await response.json();
    } catch(error) {
        console.error('Error fetching recent invoices:', error);
        return [];
    }
}

// Función para obtener todas las facturas
// Nota: actualmente el backend no expone un endpoint "all" para facturas.
// Si se necesita un listado, usar getRecentInvoices o implementar un endpoint específico.

// Función para obtener una factura por ID
export async function getInvoiceById(accessToken: string, invoiceId: string): Promise<Invoice> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/invoices/${invoiceId}`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Failed to fetch invoice: ${response.status} ${errText}`);
        }

        const raw = await response.json();
        // Normalizamos el payload del backend (status en mayúsculas, items sin total, etc.)
        const items = (raw.items ?? []).map((it: any) => ({
            id: it.id,
            description: it.description,
            quantity: Number(it.quantity),
            unitPrice: Number(it.unitPrice),
            total: Number(it.quantity) * Number(it.unitPrice),
        }));

        const subtotal = items.reduce((sum: number, i: any) => sum + i.total, 0);
        // Calculamos impuesto aproximado a partir de taxRate de cada item si existe (asumimos porcentaje 0-100)
        const tax = (raw.items ?? []).reduce((sum: number, it: any) => {
            const q = Number(it.quantity) || 0;
            const p = Number(it.unitPrice) || 0;
            const r = Number(it.taxRate) || 0;
            return sum + (q * p * (r / 100));
        }, 0);
        const total = subtotal + tax;

        const normalized: Invoice = {
            id: raw.id,
            invoiceNumber: raw.invoiceNumber,
            customerId: raw.customerId,
            // customer: puede no venir en la respuesta; mantenemos lo recibido si existe
            customer: raw.customer ?? undefined,
            status: String(raw.status).toLowerCase(),
            issueDate: raw.issueDate,
            dueDate: raw.dueDate,
            items,
            subtotal,
            tax,
            total,
            notes: raw.notes ?? undefined,
        } as Invoice;

        return normalized;
    } catch (error) {
        console.error('Error fetching invoice:', error);
        throw error;
    }
}

// Actualizar una factura (parcial)
export async function updateInvoice(
    accessToken: string,
    invoiceId: string,
    payload: Partial<{
        customerId: string;
        issueDate: string; // ISO datetime
        dueDate: string;   // ISO datetime
        items: Array<{ description: string; quantity: number; unitPrice: number; taxRate: number }>;
        status: 'DRAFT' | 'PENDING' | 'PAID' | 'CANCELLED' | 'OVERDUE';
    }>
): Promise<Invoice> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/invoices/${invoiceId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Failed to update invoice: ${response.status} ${errText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating invoice:', error);
        throw error;
    }
}

// Función para obtener todos los clientes
export async function getAllCustomers(accessToken: string): Promise<Customer[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/customers/all`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok) {
            throw new Error('Failed to fetch all customers');
        }

        const data = await response.json();
        return data.map((c: any) => ({
            id: c.id,
            name: c.name,
            email: c.email,
            address: [c.street, c.city, c.postalCode, c.country].filter(Boolean).join(', ')
        }));
    } catch(error) {
        console.error('Error fetching all customers:', error);
        throw error;
    }
}

export async function createCustomer(
    accessToken: string,
    payload: {
        name: string;
        email: string;
        street: string;
        city: string;
        postalCode: string;
        country: string;
        number?: string;
        taxId?: string;
    }
): Promise<Customer> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/customers`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: payload.name,
                email: payload.email,
                address: {
                    street: payload.street,
                    city: payload.city,
                    postalCode: payload.postalCode,
                    country: payload.country,
                },
                number: payload.number,
                taxId: payload.taxId,
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Failed to create customer: ${response.status} ${errText}`);
        }

        const c = await response.json();
        return {
            id: c.id,
            name: c.name,
            email: c.email,
            address: [c.street, c.city, c.postalCode, c.country].filter(Boolean).join(', ')
        };
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
}

// Actualiza el estado de una factura
export async function updateInvoiceStatus(
    accessToken: string,
    invoiceId: string,
    status: 'paid' | 'pending' | 'overdue' | 'cancelled'
): Promise<Invoice> {
    // El backend espera los estados en MAYÚSCULAS
    const statusMap: Record<string, string> = {
        paid: 'PAID',
        pending: 'PENDING',
        overdue: 'OVERDUE',
        cancelled: 'CANCELLED',
    };

    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/invoices/${invoiceId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: statusMap[status] ?? status.toUpperCase() })
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Failed to update invoice status: ${response.status} ${errText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating invoice status:', error);
        throw error;
    }
}

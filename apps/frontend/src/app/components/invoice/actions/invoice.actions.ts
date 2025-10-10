'use server';

import { revalidatePath } from 'next/cache';

// Interfaces
export interface InvoiceItemDto {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface CreateInvoiceDto {
  customerName: string;
  customerEmail: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  items: InvoiceItemDto[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes?: string;
}

export interface UpdateInvoiceDto extends CreateInvoiceDto {
  id: string;
}

export interface InvoiceDto extends CreateInvoiceDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Base URL para la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Función para manejar respuestas y errores
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(errorData.message || `Error: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

// Server Actions
export async function getInvoices(): Promise<InvoiceDto[]> {
  try {
    const response = await fetch(`${API_URL}/invoices`, { cache: 'no-store' });
    return handleResponse<InvoiceDto[]>(response);
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    throw error;
  }
}

export async function getInvoiceById(id: string): Promise<InvoiceDto> {
  try {
    const response = await fetch(`${API_URL}/invoices/${id}`, { cache: 'no-store' });
    return handleResponse<InvoiceDto>(response);
  } catch (error) {
    console.error(`Error al obtener factura con ID ${id}:`, error);
    throw error;
  }
}

export async function getCustomerInvoices(customerId: string): Promise<InvoiceDto[]> {
  try {
    const response = await fetch(`${API_URL}/invoices/customer/${customerId}`, { cache: 'no-store' });
    return handleResponse<InvoiceDto[]>(response);
  } catch (error) {
    console.error(`Error al obtener facturas del cliente ${customerId}:`, error);
    throw error;
  }
}

export async function createInvoice(invoice: CreateInvoiceDto): Promise<InvoiceDto> {
  try {
    const response = await fetch(`${API_URL}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
    });
    
    const result = await handleResponse<InvoiceDto>(response);
    revalidatePath('/invoices');
    return result;
  } catch (error) {
    console.error('Error al crear factura:', error);
    throw error;
  }
}

export async function updateInvoice(invoice: UpdateInvoiceDto): Promise<InvoiceDto> {
  try {
    const response = await fetch(`${API_URL}/invoices/${invoice.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
    });
    
    const result = await handleResponse<InvoiceDto>(response);
    revalidatePath('/invoices');
    revalidatePath(`/invoices/${invoice.id}`);
    return result;
  } catch (error) {
    console.error(`Error al actualizar factura con ID ${invoice.id}:`, error);
    throw error;
  }
}

export async function deleteInvoice(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/invoices/${id}`, {
      method: 'DELETE',
    });
    
    await handleResponse<void>(response);
    revalidatePath('/invoices');
  } catch (error) {
    console.error(`Error al eliminar factura con ID ${id}:`, error);
    throw error;
  }
}
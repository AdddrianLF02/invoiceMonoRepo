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
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1/create';
// URL del backend (según configuración CORS en main.ts)
const BACKEND_URL = 'http://localhost:4000';


// Función para manejar respuestas y errores
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(errorData.message || `Error: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

// Server Actions
export async function createInvoiceAction(data: CreateInvoiceDto) {
  try {
    console.log('Guardando factura:', data);
    
    // Importamos getServerSession de next-auth
    const { getServerSession } = await import('next-auth/next');
    const { authOptions } = await import('@/app/api/auth/[...nextauth]/route');
    
    // Obtenemos la sesión
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      console.error('No hay sesión de usuario');
      return { success: false, error: 'No autorizado' };
    }
    
    // Obtenemos el token de acceso de la sesión
    // @ts-ignore - Ignoramos el error de TypeScript porque sabemos que accessToken existe
    const accessToken = session.user.accessToken || session.accessToken;
    
    if (!accessToken) {
      console.error('No se encontró el token de acceso en la sesión');
      return { success: false, error: 'No se encontró el token de acceso' };
    }
    
    console.log('Token encontrado, realizando petición a la API');
    
    // Transformamos los datos al formato que espera el backend
    // Usamos un UUID válido para el customerId (hardcodeado para pruebas)
    const backendData = {
      customerId: "123e4567-e89b-12d3-a456-426614174000", // UUID válido para pruebas
      issueDate: data.date,
      dueDate: data.dueDate,
      items: data.items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        taxRate: data.taxRate || 0.1
      }))
    };
    
    console.log('Datos transformados para el backend:', backendData);
    
    // Usamos directamente la URL del backend
    const url = 'http://localhost:4000/api/v1/invoices';
    console.log('URL de la petición:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(backendData),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error en la respuesta: ${response.status} ${response.statusText}`, errorText);
      return { 
        success: false, 
        error: `Error ${response.status}: ${errorText || response.statusText}` 
      };
    }

    const result = await response.json();
    
    // Revalidamos las rutas que muestran facturas
    revalidatePath('/dashboard');
    revalidatePath('/invoices');
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Error al crear factura:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    };
  }
}

export async function updateInvoiceAction(id: string, data: Partial<CreateInvoiceDto>) {
  try {
    const response = await fetch(`${API_URL}/invoices/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await handleResponse<InvoiceDto>(response);
    
    // Revalidamos las rutas que muestran facturas
    revalidatePath('/dashboard');
    revalidatePath(`/invoices/${id}`);
    
    return { success: true, data: result };
  } catch (error) {
    console.error(`Error al actualizar factura ${id}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    };
  }
}

export async function deleteInvoiceAction(id: string) {
  try {
    const response = await fetch(`${API_URL}/invoices/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar factura: ${response.status}`);
    }
    
    // Revalidamos las rutas que muestran facturas
    revalidatePath('/dashboard');
    
    return { success: true };
  } catch (error) {
    console.error(`Error al eliminar factura ${id}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    };
  }
}
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
import React from 'react';
import { notFound } from 'next/navigation';
// import { getServerSession } from 'next-auth/next'; // <-- Ya no se usa
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // <-- Ya no se usa
import { getInvoiceById } from '@/lib/api-service'; // Esta función ya usa el token
import MinimalTemplate from '@/app/components/invoice/templates/MinimalTemplate';
import ModernTemplate from '@/app/components/invoice/templates/ModernTemplate';
import ClassicTemplate from '@/app/components/invoice/templates/ClassicTemplate';
import { Invoice } from '@/lib/types'; // Asegúrate de que este tipo sea correcto

// --- Helper para seleccionar la plantilla (sin cambios) ---
const getTemplateComponent = (templateName: string) => {
  switch (templateName?.toLowerCase()) {
    case 'minimal':
      return MinimalTemplate;
    case 'modern':
      return ModernTemplate;
    case 'classic':
    default:
      return ClassicTemplate;
  }
};

// --- Props para la página (actualizadas) ---
interface PrintInvoicePageProps {
  params: { id: string };
  searchParams: { 
    template?: string;
    token?: string; // <-- ¡Aquí recibiremos el token!
  };
}

// --- El Server Component (Modificado) ---
export default async function PrintInvoicePage({ params, searchParams }: PrintInvoicePageProps) {
  const { id } = params;
  const templateName = searchParams.template || 'classic';
  
  // --- 1. NUEVA Autenticación (basada en el token de la URL) ---
  const printToken = searchParams.token;

  if (!printToken) {
    // Si Puppeteer (o alguien) llega sin token, bloqueamos
    console.warn('Acceso denegado a ruta de impresión: Sin token.');
    notFound(); // Devuelve un 404
  }

  // --- 2. Obtener datos de la factura (Usando el printToken) ---
  let invoiceData: Invoice | null = null;
  try {
    // Pasamos el printToken directamente a getInvoiceById.
    // Esta función (en lib/api-service.ts) lo usará como 'Authorization: Bearer <printToken>'
    // El AuthGuard del backend lo validará (firma, expiración, scope).
    invoiceData = await getInvoiceById(printToken, id);
    
    // Aquí podrías añadir una validación extra (si el token tiene el scope 'print:invoice'
    // y el 'invoiceId' del token coincide con el 'id' de la URL), pero
    // confiamos en que el AuthGuard del backend y la lógica de negocio ya lo hacen.

  } catch (error: any) {
    // Si el token es inválido, la API devolverá 401/403, y api-service lanzará un error.
    // Si la factura no existe o no pertenece al usuario del token, devolverá 404.
    console.error(`Error fetching invoice for print (ID: ${id}): ${error.message}`);
    notFound();
  }

  if (!invoiceData) {
    notFound();
  }
  
  // 3. Seleccionar y renderizar la plantilla (sin cambios)
  const TemplateComponent = getTemplateComponent(templateName);

  // --- Cálculos y Mapeo de Props (sin cambios) ---
  const calculatedSubtotal = (invoiceData.items ?? []).reduce(
    (sum, item) => sum + (Number(item.quantity ?? 0) * Number(item.unitPrice ?? 0)),
    0
  );

  const globalTaxRatePercentage = typeof invoiceData.tax === 'number' ? invoiceData.tax : 0;
  const calculatedTax = calculatedSubtotal * (globalTaxRatePercentage / 100);
  const calculatedTotal = calculatedSubtotal + calculatedTax;

  const templateProps = {
    invoiceData: {
        invoiceNumber: invoiceData.invoiceNumber ?? '',
        date: invoiceData.issueDate ? new Date(invoiceData.issueDate).toLocaleDateString() : '',
        dueDate: invoiceData.dueDate ? new Date(invoiceData.dueDate).toLocaleDateString() : '',
        fromName: 'InvoiceFlow',
        fromEmail: 'contact@invoiceflow.com',
        fromAddress: 'Tu Dirección\nCiudad, País',
        toName: invoiceData.customer?.name ?? '',
        toEmail: invoiceData.customer?.email ?? '',
        toAddress: invoiceData.customer?.address ?? '',
        notes: invoiceData.notes ?? '',
        taxRate: globalTaxRatePercentage
    },
    items: (invoiceData.items ?? []).map(item => ({
        description: item.description ?? '',
        quantity: Number(item.quantity ?? 0),
        rate: Number(item.unitPrice ?? 0),
        amount: Number(item.quantity ?? 0) * Number(item.unitPrice ?? 0),
    })),
    subtotal: calculatedSubtotal,
    tax: calculatedTax,
    total: calculatedTotal,
  };

  // 4. Renderizado Final (sin cambios)
  return (
      <div className="print-container bg-white">
        <TemplateComponent {...templateProps} />
      </div>
  );
}

// Opcional: Deshabilitar cache
export const dynamic = 'force-dynamic';
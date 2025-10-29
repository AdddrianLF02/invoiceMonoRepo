import React from 'react';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next'; // Para autenticación en Server Component
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Ajusta la ruta si es necesario
import { getInvoiceById } from '@/lib/api-service'; // Asumimos que tienes esta función
import MinimalTemplate from '@/app/components/invoice/templates/MinimalTemplate'; // Importa tus plantillas
import ModernTemplate from '@/app/components/invoice/templates/ModernTemplate';
import ClassicTemplate from '@/app/components/invoice/templates/ClassicTemplate';
import { Invoice } from '@/lib/types'; // Asegúrate de que este tipo sea correcto

// --- Helper para seleccionar la plantilla ---
const getTemplateComponent = (templateName: string) => {
  switch (templateName?.toLowerCase()) {
    case 'minimal':
      return MinimalTemplate;
    case 'modern':
      return ModernTemplate;
    case 'classic':
    default: // Por defecto, usa Classic o tu plantilla predeterminada
      return ClassicTemplate;
  }
};

// --- Props para la página ---
interface PrintInvoicePageProps {
  params: { id: string };
  searchParams: { template?: string }; // Recibimos el nombre de la plantilla como query param
}

// --- El Server Component ---
export default async function PrintInvoicePage({ params, searchParams }: PrintInvoicePageProps) {
  const { id } = params;
  const templateName = searchParams.template || 'classic'; // Plantilla por defecto

  // 1. Autenticación (¡Importante!) - El backend (Puppeteer) necesitará enviar un token válido
  //    Considera un mecanismo seguro, como un token de corta duración específico para esta tarea.
  //    Por ahora, usaremos la sesión del usuario que solicita, pero esto debe revisarse.
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken ?? (session as any)?.token?.accessToken;

  if (!accessToken) {
     // Si Puppeteer no está autenticado, no debería poder ver la factura
     // Podrías devolver un 401 aquí, pero notFound (404) oculta la existencia de la ruta
     notFound();
  }

  // 2. Obtener datos de la factura
  let invoiceData: Invoice | null = null;
  try {
    invoiceData = await getInvoiceById(accessToken, id);
  } catch (error) {
    console.error("Error fetching invoice for print:", error);
    // Si hay un error (ej: factura no encontrada o problema de permisos), devuelve 404
    notFound();
  }

  if (!invoiceData) {
    notFound();
  }

  // 3. Seleccionar y renderizar la plantilla adecuada
  const TemplateComponent = getTemplateComponent(templateName);
  
  const calculatedSubtotal = (invoiceData.items ?? []).reduce(
    (sum, item) => sum + (Number(item.quantity ?? 0) * Number(item.unitPrice ?? 0)),
    0
  );

  // CORRECCIÓN: Calculamos el impuesto globalmente.
  // Buscamos invoiceData.taxRate. Si no existe, asumimos 0 (o 21% si prefieres el default de pdf-generator.ts)
  // Verifica si tu tipo Invoice en @/lib/types.ts tiene 'taxRate: number | null | undefined'
  const globalTaxRatePercentage = typeof invoiceData.tax === 'number' ? invoiceData.tax : 0; // Asumimos 0 si no se especifica
  const calculatedTax = calculatedSubtotal * (globalTaxRatePercentage / 100);

  const calculatedTotal = calculatedSubtotal + calculatedTax;
  // --- Adaptación de datos al formato esperado por la plantilla ---
  //      (Esto es crucial y dependerá de cómo estén definidos tus componentes de plantilla)
  //      Ajusta este mapeo según las props que esperan MinimalTemplate, ModernTemplate, etc.
  const templateProps = {
    // Ejemplo de mapeo - NECESITAS ADAPTARLO
    invoiceData: {
        invoiceNumber: invoiceData.invoiceNumber ?? '',
        date: invoiceData.issueDate ? new Date(invoiceData.issueDate).toLocaleDateString() : '',
        dueDate: invoiceData.dueDate ? new Date(invoiceData.dueDate).toLocaleDateString() : '',
        fromName: 'InvoiceFlow', // O datos de tu empresa
        fromEmail: 'contact@invoiceflow.com',
        fromAddress: 'Tu Dirección\nCiudad, País',
        toName: invoiceData.customer?.name ?? '',
        toEmail: invoiceData.customer?.email ?? '',
        toAddress: invoiceData.customer?.address ?? '',
        notes: invoiceData.notes ?? '',
    },
    items: (invoiceData.items ?? []).map(item => ({
        description: item.description ?? '',
        quantity: Number(item.quantity ?? 0),
        // ¡Cuidado! 'rate' vs 'unitPrice'. Asegúrate de usar el campo correcto de tu tipo InvoiceItem
        rate: Number(item.unitPrice ?? 0),
        amount: Number(item.quantity ?? 0) * Number(item.unitPrice ?? 0),
    })),
    // Calcula los totales (podrías reutilizar lógica de pdf-generator.ts si la mueves a @/lib)
    subtotal: calculatedSubtotal,
    tax: calculatedTax, // Monto total del impuesto
    total: calculatedTotal,

  };

  // 4. Renderizado Final (sin Layout principal)
  //    Next.js por defecto aplicará el layout raíz. Si quieres evitarlo
  //    totalmente (quitar <html>, <head>, <body>), necesitarías configurar un layout específico
  //    para esta ruta que devuelva directamente {children}, pero generalmente no es necesario.
  //    Puppeteer trabajará bien con la estructura HTML básica.
  return (
      <div className="print-container bg-white"> {/* Asegura fondo blanco para PDF */}
        {/*
          IMPORTANTE: Aquí pasamos las props adaptadas.
          Asegúrate de que los nombres coincidan con lo que espera cada plantilla.
          Por ejemplo, si MinimalTemplate espera `invoiceNumber` directamente en `invoiceData`,
          y tu `invoiceData` (tipo Invoice) lo tiene, está bien. Si espera `numeroFactura`,
          necesitas hacer el mapeo en `templateProps`.
        */}
        <TemplateComponent {...templateProps} />
      </div>
  );
}

// Opcional: Deshabilitar cache para asegurar datos frescos si es necesario
export const dynamic = 'force-dynamic';
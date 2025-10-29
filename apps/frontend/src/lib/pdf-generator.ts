// Función para calcular los totales de la factura
function calculateInvoiceTotals(invoice: any) {
  // Calculamos el subtotal sumando todos los items
  const items = Array.isArray(invoice.items) ? invoice.items : [];
  const subtotal = items.reduce((sum: number, item: any) => {
    const q = Number(item?.quantity) || 0;
    const p = Number(item?.unitPrice) || 0;
    return sum + (q * p);
  }, 0);
  
  // Calculamos el impuesto (asumimos que es el 21% o usamos el valor de la factura si existe)
  const taxRate = typeof invoice.taxRate === 'number' ? invoice.taxRate : 0.21;
  const tax = subtotal * taxRate;
  
  // Calculamos el total
  const total = subtotal + tax;
  
  return {
    subtotal,
    tax,
    total
  };
}

// Interfaz para definir el formato de la plantilla
export interface TemplateFormat {
  name: string;
  style: {
    fontFamily?: string;
    primaryColor?: string;
    secondaryColor?: string;
    scale?: number;
  };
}

// Definición de formatos de plantilla
export const templateFormats: Record<string, TemplateFormat> = {
  classic: {
    name: 'Classic',
    style: {
      fontFamily: 'Helvetica',
      primaryColor: '#000000',
      secondaryColor: '#555555',
      scale: 2
    }
  },
  minimal: {
    name: 'Minimal',
    style: {
      fontFamily: 'Arial',
      primaryColor: '#333333',
      secondaryColor: '#777777',
      scale: 1.8
    }
  },
  modern: {
    name: 'Modern',
    style: {
      fontFamily: 'Roboto',
      primaryColor: '#2563eb',
      secondaryColor: '#64748b',
      scale: 2.2
    }
  }
};

// Esta función genera un PDF simple sin necesidad de un elemento HTML
// Genera HTML imprimible con CSS inline, sin dependencias de Tailwind ni funciones CSS modernas
function buildPrintableInvoiceHTML(invoice: any, currency: string = '€') {
  const formatMoney = (n: number) => `${n.toFixed(2)} ${currency}`;
  const itemsRows = (invoice.items || [])
    .map((it: any) => `
      <tr>
        <td>${escapeHtml(it.description ?? '')}</td>
        <td class="num">${Number(it.quantity || 0)}</td>
        <td class="num">${formatMoney(Number(it.unitPrice || 0))}</td>
        <td class="num">${formatMoney(Number(it.quantity || 0) * Number(it.unitPrice || 0))}</td>
      </tr>
    `)
    .join('');

  const subtotal = (invoice.items || []).reduce((s: number, it: any) => s + (Number(it.quantity||0) * Number(it.unitPrice||0)), 0);
  const tax = (invoice.items || []).reduce((s: number, it: any) => s + (Number(it.quantity||0) * Number(it.unitPrice||0) * (Number(it.taxRate||0)/100)), 0);
  const total = subtotal + tax;

  const issue = invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString() : '';
  const due = invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '';
  const clientName = invoice.customer?.name ?? '';
  const clientEmail = invoice.customer?.email ?? '';
  const clientAddress = invoice.customer?.address ?? '';

  return `
  <div class="inv">
    <div class="header">
      <div class="title">FACTURA</div>
      <div class="meta">
        <div><span>Número:</span> ${escapeHtml(invoice.invoiceNumber ?? '')}</div>
        <div><span>Fecha:</span> ${issue}</div>
        <div><span>Vencimiento:</span> ${due}</div>
      </div>
    </div>
    <div class="grid">
      <div>
        <div class="label">De</div>
        <div>InvoiceFlow</div>
      </div>
      <div>
        <div class="label">Para</div>
        <div>${escapeHtml(clientName)}</div>
        <div>${escapeHtml(clientEmail)}</div>
        <div>${escapeHtml(clientAddress)}</div>
      </div>
    </div>
    <table class="items">
      <thead>
        <tr>
          <th>Descripción</th>
          <th class="num">Cant.</th>
          <th class="num">Precio</th>
          <th class="num">Importe</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>
    <div class="totals">
      <div class="row"><div>Subtotal</div><div>${formatMoney(subtotal)}</div></div>
      <div class="row"><div>Impuestos</div><div>${formatMoney(tax)}</div></div>
      <div class="row total"><div>Total</div><div>${formatMoney(total)}</div></div>
    </div>
  </div>
  <style>
    .inv { font-family: Arial, Helvetica, sans-serif; color: #111; background:#fff; width: 794px; padding: 24px; box-sizing: border-box; }
    .header { display:flex; justify-content: space-between; align-items:flex-start; margin-bottom: 16px; }
    .title { font-size: 24px; font-weight: bold; color: #111; }
    .meta { text-align:right; font-size: 12px; color:#333; }
    .meta span { font-weight:600; color:#000; }
    .grid { display:grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    .label { font-size: 12px; color:#555; text-transform: uppercase; letter-spacing: .05em; }
    table.items { width:100%; border-collapse: collapse; margin-top:8px; }
    table.items th { text-align:left; background:#f2f3f5; color:#222; font-weight:600; font-size:12px; padding:8px; border-bottom:1px solid #e3e5e8; }
    table.items td { font-size:12px; padding:8px; border-bottom:1px solid #eee; vertical-align:top; }
    table.items td.num, table.items th.num { text-align:right; }
    .totals { width: 300px; margin-left:auto; margin-top:16px; font-size:13px; }
    .totals .row { display:flex; justify-content: space-between; padding:6px 0; border-bottom:1px solid #eee; }
    .totals .row.total { font-weight:700; font-size:14px; border-bottom:none; }
  </style>
  `;
}

// Evita XSS básico en campos de texto
function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function generateSimpleInvoicePDF(invoice: any, elementId?: string, templateName?: string) {
  // Importamos jsPDF de forma dinámica
  const { default: jsPDF } = await import('jspdf');
  // Intentamos cargar html2canvas para soportar renderizado de elementos HTML
  let html2canvas: any = null;
  try {
    const mod = await import('html2canvas');
    html2canvas = (mod as any).default ?? mod;
  } catch (e) {
    // Si no está disponible, continuamos con la generación simple
    console.warn('html2canvas no disponible, usando generador simple');
  }
  
  try {
    // Calculamos los totales
    const totals = calculateInvoiceTotals(invoice);
    
    // Creamos un nuevo documento PDF (A4 en milímetros)
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Preferimos renderizar HTML imprimible con CSS inline (sin Tailwind) para evitar incompatibilidades
    if (typeof document !== 'undefined') {
      try {
        const html = buildPrintableInvoiceHTML(invoice, '€');
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '-10000px';
        container.style.top = '0';
        container.style.width = '794px'; // ~A4 @ 96dpi
        container.style.background = '#ffffff';
        container.innerHTML = html;
        document.body.appendChild(container);

        const scale = 2;
        await (pdf as any).html(container, {
          x: 10,
          y: 10,
          width: 190, // ancho útil A4 con márgenes
          windowWidth: 794,
          html2canvas: html2canvas ? { scale, useCORS: true, backgroundColor: '#ffffff' } : undefined
        });

        document.body.removeChild(container);

        const fileNameFromTpl = `factura-${invoice.invoiceNumber}.pdf`;
        pdf.save(fileNameFromTpl);
        return { success: true, fileName: fileNameFromTpl };
      } catch (err) {
        console.warn('Fallo renderizando HTML imprimible; fallback a layout simple.', err);
        // continuar a fallback manual
      }
    }
    
    // Fallback: PDF simple dibujado manualmente
    // Añadimos el título
    pdf.setFontSize(20);
    pdf.text('FACTURA', 105, 20, { align: 'center' });
    
    // Información de la factura
    pdf.setFontSize(12);
    pdf.text(`Número: ${invoice.invoiceNumber}`, 20, 40);
    pdf.text(`Fecha: ${new Date(invoice.issueDate).toLocaleDateString()}`, 20, 50);
    pdf.text(`Vencimiento: ${invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}`, 20, 60);
    
    // Información del cliente (tolerante a undefined)
    pdf.text('Cliente:', 20, 80);
    const customerName = (invoice.customer?.companyName) || (invoice.customer?.name) || '';
    const customerEmail = invoice.customer?.email || '';
    const customerAddress = invoice.customer?.address || '';
    pdf.text(`${customerName}`, 20, 90);
    pdf.text(`${customerEmail}`, 20, 100);
    pdf.text(`${customerAddress}`, 20, 110);
    
    // Tabla de items
    pdf.text('Descripción', 20, 130);
    pdf.text('Cant.', 120, 130);
    pdf.text('Precio', 140, 130);
    pdf.text('Total', 170, 130);
    
    pdf.line(20, 135, 190, 135);
    
    let y = 145;
    
    // Añadimos cada item
    invoice.items.forEach((item: any) => {
      pdf.text(item.description, 20, y);
      pdf.text(item.quantity.toString(), 120, y);
      pdf.text(`${item.unitPrice.toFixed(2)} €`, 140, y);
      pdf.text(`${(item.quantity * item.unitPrice).toFixed(2)} €`, 170, y);
      y += 10;
    });
    
    // Línea de separación
    pdf.line(20, y, 190, y);
    y += 10;
    
    // Totales
    pdf.text('Subtotal:', 140, y);
    pdf.text(`${totals.subtotal.toFixed(2)} €`, 170, y);
    y += 10;
    
    pdf.text('IVA:', 140, y);
    pdf.text(`${totals.tax.toFixed(2)} €`, 170, y);
    y += 10;
    
    pdf.text('Total:', 140, y);
    pdf.setFontSize(14);
    pdf.text(`${totals.total.toFixed(2)} €`, 170, y);
    
    // Guardamos el PDF
    const fileName = `factura-${invoice.invoiceNumber}.pdf`;
    pdf.save(fileName);
    
    return {
      success: true,
      fileName
    };
  } catch (error) {
    console.error('Error al generar PDF simple:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}
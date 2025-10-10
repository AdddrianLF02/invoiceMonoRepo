// Función para calcular los totales de la factura
function calculateInvoiceTotals(invoice: any) {
  // Calculamos el subtotal sumando todos los items
  const subtotal = invoice.items.reduce((sum: number, item: any) => {
    return sum + (item.quantity * item.unitPrice);
  }, 0);
  
  // Calculamos el impuesto (asumimos que es el 21% o usamos el valor de la factura si existe)
  const taxRate = invoice.taxRate || 0.21;
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
export async function generateSimpleInvoicePDF(invoice: any) {
  // Importamos jsPDF de forma dinámica
  const { default: jsPDF } = await import('jspdf');
  
  try {
    // Calculamos los totales
    const totals = calculateInvoiceTotals(invoice);
    
    // Creamos un nuevo documento PDF
    const pdf = new jsPDF();
    
    // Añadimos el título
    pdf.setFontSize(20);
    pdf.text('FACTURA', 105, 20, { align: 'center' });
    
    // Información de la factura
    pdf.setFontSize(12);
    pdf.text(`Número: ${invoice.invoiceNumber}`, 20, 40);
    pdf.text(`Fecha: ${new Date(invoice.issueDate).toLocaleDateString()}`, 20, 50);
    pdf.text(`Vencimiento: ${invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}`, 20, 60);
    
    // Información del cliente
    pdf.text('Cliente:', 20, 80);
    pdf.text(`${invoice.customer.name}`, 20, 90);
    pdf.text(`${invoice.customer.email}`, 20, 100);
    pdf.text(`${invoice.customer.address || ''}`, 20, 110);
    
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
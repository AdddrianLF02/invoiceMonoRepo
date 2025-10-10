"use client"

import { useState } from 'react';
import { Invoice } from '@/lib/types';
import { toast } from 'sonner';

export interface UsePDFGeneratorResult {
  isGenerating: boolean;
  generatePDF: (invoice: Invoice, elementId: string, templateName: string) => Promise<void>;
}

/**
 * Hook personalizado para la generación de PDF de facturas
 */
export const useInvoicePDF = (): UsePDFGeneratorResult => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async (invoice: Invoice, elementId: string, templateName: string) => {
    try {
      setIsGenerating(true);
      
      // Importación dinámica del generador de PDF
      const { generateSimpleInvoicePDF } = await import('@/lib/pdf-generator');
      const result = await generateSimpleInvoicePDF(invoice, elementId, templateName);
      
      if (result && result.success) {
        toast.success(`PDF generado: ${result.fileName}`);
      }
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      toast.error('Error al generar el PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generatePDF
  };
};

export default useInvoicePDF;
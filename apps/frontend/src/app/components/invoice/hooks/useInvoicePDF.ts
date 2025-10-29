"use client"

import { useState } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react'; // Asegúrate de que esto esté importado

// Interfaz actualizada para el hook
export interface UseAsyncPDFGeneratorResult {
  isGenerating: boolean;
  // Cambiamos los parámetros: solo necesitamos el ID y el nombre de la plantilla
  requestPDFGeneration: (invoiceId: string, templateName: string) => Promise<{ success: boolean; jobId?: string }>;
}

/**
 * Hook personalizado para solicitar la generación asíncrona de PDF de facturas en el backend.
 */
export const useInvoicePDF = (): UseAsyncPDFGeneratorResult => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { data: session } = useSession(); // Obtenemos la sesión para el token

  const requestPDFGeneration = async (invoiceId: string, templateName: string): Promise<{ success: boolean; jobId?: string }> => {
    // Obtenemos el token de acceso
    const accessToken = (session as any)?.accessToken ?? (session as any)?.token?.accessToken;
    if (!accessToken) {
      toast.error('No autenticado. No se puede solicitar el PDF.');
      return { success: false };
    }

    try {
      setIsGenerating(true);
      toast.info('Solicitando generación de PDF...');

      // Construimos la URL del endpoint del backend (ajústala si tu API tiene otro prefijo)
      // Asegúrate de tener la variable de entorno NEXT_PUBLIC_API_URL configurada
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'; // Valor por defecto para desarrollo
      const endpoint = `${apiUrl}/api/v1/invoices/${invoiceId}/generate-pdf`;

      // Hacemos la petición POST al backend
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Enviamos el token
        },
        body: JSON.stringify({ templateName }), // Enviamos el nombre de la plantilla
      });

      // Manejamos la respuesta
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error desconocido al solicitar PDF' }));
        throw new Error(errorData.message || `Error ${response.status} al solicitar PDF`);
      }

      // Si la respuesta es 202 Accepted (o similar), la solicitud fue exitosa
      if (response.status === 202) {
        const result = await response.json();
        toast.success(`Generación de PDF iniciada (Job ID: ${result.jobId}). Te notificaremos cuando esté listo.`);
        return { success: true, jobId: result.jobId };
      } else {
         // Otro código de éxito (por si acaso decides devolver 200 o 201)
         const result = await response.json();
         toast.success('Solicitud de PDF enviada.');
         return { success: true, jobId: result.jobId }; // Asumimos que devuelve jobId
      }

    } catch (error) {
      console.error('Error al solicitar la generación del PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al solicitar PDF';
      toast.error(errorMessage);
      return { success: false };
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    requestPDFGeneration
  };
};

export default useInvoicePDF;
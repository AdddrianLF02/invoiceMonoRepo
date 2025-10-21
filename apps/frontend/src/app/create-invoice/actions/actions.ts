"use server";

import { revalidatePath } from 'next/cache';

// Esta es una Server Action
export async function createInvoiceAction(invoiceData: any) {
  // Aquí iría la lógica para conectar con tu backend de NestJS y guardar la factura.
  // Por ahora, simularemos una operación asíncrona y luego revalidaremos la ruta del dashboard.
  console.log("Guardando factura:", invoiceData);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simular llamada a la API

  // Después de guardar la factura, revalidamos la ruta del dashboard
  // para que la lista de facturas recientes se actualice.
  revalidatePath('/dashboard');

  return { success: true, message: "Factura guardada correctamente" };
}
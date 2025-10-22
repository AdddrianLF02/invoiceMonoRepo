"use client";
import React, { useTransition } from "react";
import { Download, Save } from "lucide-react";
import TemplateSelector from "../../TemplateSelector";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import useInvoiceState from "../hooks/useInvoiceState";
import useInvoicePDF from "../hooks/useInvoicePDF";
import InvoiceForm from "./InvoiceForm";
import InvoicePreview from "./InvoicePreview";
import { toast } from "sonner";
import { Invoice } from "@/lib/types";
import { createInvoiceAction } from "@/app/create-invoice/actions/invoice.actions";


const InvoiceGenerator = () => {
  const { state, dispatch, calculations } = useInvoiceState();
  const { isGenerating, generatePDF } = useInvoicePDF();
  const { subtotal, tax, total } = calculations;
  const [isPending, startTransition] = useTransition(); 

  const handleGeneratePDF = async () => {
    try {
      // Creamos un objeto que cumpla con la interfaz Invoice
      const invoice: Invoice = {
        id: "temp-" + Date.now(), // ID temporal
        invoiceNumber: state.invoiceData.invoiceNumber,
        customerId: "temp-customer", // ID temporal del cliente
        customer: {
          id: "temp-customer",
          name: state.invoiceData.toName,
          email: state.invoiceData.toEmail,
          address: state.invoiceData.toAddress
        },
        status: "draft", // Estado por defecto
        issueDate: state.invoiceData.date,
        dueDate: state.invoiceData.dueDate,
        items: state.items.map((i) => ({
          id: "item-" + Math.random().toString(36).substring(2, 9),
          description: i.description,
          quantity: i.quantity,
          unitPrice: i.rate,
          total: i.amount,
        })),
        subtotal: subtotal,
        tax: tax,
        total: total,
        notes: state.invoiceData.notes,
      };

      // PDF en cliente
      await generatePDF(invoice, "invoice-preview", state.selectedTemplate);
      toast.success("PDF generado correctamente");
    } catch (error) {
      toast.error("Error al generar el PDF");
      console.error(error);
    }
  };
  
  const handleSaveInvoice = async () => {
    if (isPending) return;
    
    const invoiceData = {
      customerName: state.invoiceData.toName,
      customerEmail: state.invoiceData.toEmail,
      invoiceNumber: state.invoiceData.invoiceNumber,
      date: state.invoiceData.date,
      dueDate: state.invoiceData.dueDate,
      items: state.items.map((i) => ({
        description: i.description,
        quantity: i.quantity,
        unitPrice: i.rate,
        amount: i.amount,
      })),
      subtotal: subtotal,
      taxRate: 0.1,
      taxAmount: tax,
      total: total,
      notes: state.invoiceData.notes,
    };

    startTransition(async () => {
      try {
        const result = await createInvoiceAction(invoiceData);
        if (result.success) {
          toast.success("Factura guardada correctamente");
          // Opcional: redirigir al dashboard o a la lista de facturas
        } else {
          toast.error(result.error || "Error al guardar la factura");
        }
      } catch (error) {
        toast.error("Error al guardar la factura");
        console.error(error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Crear Factura</h1>
          <p className="text-gray-600 mt-2">
            Genera facturas profesionales en minutos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Selecciona una plantilla</CardTitle>
              </CardHeader>
              <CardContent>
                <TemplateSelector
                  selectedTemplate={state.selectedTemplate}
                  onTemplateSelect={(template) =>
                    dispatch({ type: "SET_TEMPLATE", payload: template })
                  }
                />
              </CardContent>
            </Card>

            <InvoiceForm state={state} dispatch={dispatch} />

            <div className="flex justify-end space-x-4">
              <Button
                onClick={handleSaveInvoice}
                disabled={isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isPending ? "Guardando..." : "Guardar Factura"}
              </Button>
              <Button
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                {isGenerating ? "Generando..." : "Generar PDF"}
              </Button>
            </div>
          </div>

          {/* Vista previa */}
          <div className="sticky top-8">
            <Card>
              <CardHeader>
                <CardTitle>Vista previa</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <InvoicePreview
                  state={state}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;

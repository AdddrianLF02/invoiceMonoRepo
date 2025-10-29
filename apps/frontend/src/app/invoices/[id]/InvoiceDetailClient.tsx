"use client";
import React, { useMemo, useState } from "react";
import { Invoice } from "@/lib/types";
import TemplateSelector, { TemplateType } from "../../components/TemplateSelector";
import InvoicePreview from "../../components/invoice/components/InvoicePreview";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import useInvoicePDF from "../../components/invoice/hooks/useInvoicePDF";
import InvoiceActions from "../../components/invoice/InvoiceActions";
import { useSession } from "next-auth/react";
import { updateInvoice } from "@/lib/api-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  invoice: Invoice;
}

// Mapea una factura del backend al estado esperado por InvoicePreview
function useMappedInvoiceState(invoice: Invoice) {
  const mapped = useMemo(() => {
    const items = invoice.items.map((i) => ({
      description: i.description,
      quantity: i.quantity,
      rate: i.unitPrice,
      // El backend no devuelve el "total" por item, lo calculamos
      amount: Number(i.quantity) * Number(i.unitPrice),
    }));
    const invoiceData = {
      customerId: invoice.customerId,
      invoiceNumber: invoice.invoiceNumber,
      date: invoice.issueDate,
      dueDate: invoice.dueDate,
      fromName: "",
      fromEmail: "",
      fromAddress: "",
      toName: invoice.customer?.name ?? "",
      toEmail: invoice.customer?.email ?? "",
      toAddress: invoice.customer?.address ?? "",
      notes: invoice.notes ?? "",
    };
    const subtotal = items.reduce((sum, i) => sum + i.amount, 0);
    const tax = invoice.tax ?? 0;
    const total = invoice.total ?? subtotal + tax;
    const state = { selectedTemplate: 'modern' as TemplateType, invoiceData, items };
    return { state, subtotal, tax, total };
  }, [invoice]);

  return mapped;
}

export default function InvoiceDetailClient({ invoice }: Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const { isGenerating, generatePDF } = useInvoicePDF();
  const { data: session } = useSession();
  const router = useRouter();
  const accessToken = (session as any)?.accessToken ?? (session as any)?.token?.accessToken;

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dueDateInput, setDueDateInput] = useState<string>(() => {
    try {
      // Convertimos a YYYY-MM-DD para el input date
      return invoice.dueDate ? new Date(invoice.dueDate).toISOString().slice(0, 10) : '';
    } catch {
      return '';
    }
  });

  const { state, subtotal, tax, total } = useMappedInvoiceState(invoice);
  // Sobrescribimos la plantilla seleccionada desde el estado mapeado
  const previewState = { ...state, selectedTemplate } as typeof state;

  const onGenerate = async () => {
    await generatePDF(invoice, 'invoice-preview', selectedTemplate);
  };

  const onEditToggle = () => setEditing((v) => !v);

  const onSaveDueDate = async () => {
    if (!accessToken) {
      toast.error('No estás autenticado');
      return;
    }
    if (!dueDateInput) {
      toast.error('Selecciona una fecha de vencimiento válida');
      return;
    }
    try {
      setSaving(true);
      // Convertimos YYYY-MM-DD a ISO con T00:00:00Z
      const newDueISO = new Date(`${dueDateInput}T00:00:00Z`).toISOString();
      await updateInvoice(accessToken, invoice.id, { dueDate: newDueISO });
      toast.success('Fecha de vencimiento actualizada');
      setEditing(false);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? 'No se pudo guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Selecciona plantilla</CardTitle>
        </CardHeader>
        <CardContent>
          <TemplateSelector selectedTemplate={selectedTemplate} onTemplateSelect={setSelectedTemplate} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>Vista previa</CardTitle>
            <div className="flex items-center gap-2">
              {!editing && (
                <Button variant="outline" onClick={onEditToggle}>Editar vencimiento</Button>
              )}
              {editing && (
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={dueDateInput}
                    onChange={(e) => setDueDateInput(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <Button size="sm" onClick={onSaveDueDate} disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</Button>
                  <Button size="sm" variant="secondary" onClick={onEditToggle} disabled={saving}>Cancelar</Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <InvoicePreview state={previewState as any} subtotal={subtotal} tax={tax} total={total} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={onGenerate} disabled={isGenerating}>
          {isGenerating ? 'Generando...' : 'Descargar PDF'}
        </Button>
        <InvoiceActions invoiceId={invoice.id} currentStatus={invoice.status} />
      </div>
    </div>
  );
}
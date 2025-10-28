"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { useSession } from "next-auth/react";
import { updateInvoiceStatus } from "@/lib/api-service";
import { toast } from "sonner";

interface Props {
  invoiceId: string;
  currentStatus: 'paid' | 'pending' | 'overdue' | 'draft';
}

export default function InvoiceActions({ invoiceId, currentStatus }: Props) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<string | null>(null);

  const accessToken = (session as any)?.accessToken ?? (session as any)?.token?.accessToken;

  const handle = async (next: 'paid' | 'cancelled') => {
    if (!accessToken) {
      toast.error("No estás autenticado");
      return;
    }
    try {
      setLoading(next);
      const updated = await updateInvoiceStatus(accessToken, invoiceId, next);
      toast.success(`Factura ${updated.invoiceNumber ?? invoiceId} actualizada a ${updated.status}`);
    } catch (e: any) {
      toast.error(e?.message ?? "Error actualizando estado");
    } finally {
      setLoading(null);
    }
  };

  const canMarkPaid = currentStatus === 'pending' || currentStatus === 'overdue';
  const canCancel = currentStatus === 'pending' || currentStatus === 'overdue' || currentStatus === 'draft';

  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        size="sm"
        disabled={!canMarkPaid || !!loading}
        onClick={() => handle('paid')}
      >
        {loading === 'paid' ? 'Guardando...' : 'Marcar pagada'}
      </Button>
      <Button
        variant="destructive"
        size="sm"
        disabled={!canCancel || !!loading}
        onClick={() => handle('cancelled')}
      >
        {loading === 'cancelled' ? 'Guardando...' : 'Cancelar'}
      </Button>
    </div>
  );
}
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { getRecentInvoices, InvoiceSummary } from "@/lib/api-service";
import InvoiceActions from "../invoice/InvoiceActions";

interface Props {
    accessToken: string;
}

export default function InvoicesPanel({ accessToken }: Props) {
    const [invoices, setInvoices] = useState<InvoiceSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const data = await getRecentInvoices(accessToken);
            setInvoices(data);
            setLoading(false);
        }
        load();
    }, [accessToken]);

    const getStatusClass = (status: string) => {
        const map: Record<string, string> = {
            paid: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            overdue: "bg-red-100 text-red-800",
            cancelled: "bg-muted text-muted-foreground",
            draft: "bg-blue-100 text-blue-800",
        };
        return map[status] ?? "bg-muted text-muted-foreground";
    };

    if (loading) {
        return <div className="space-y-3">{[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse bg-muted rounded-lg" />
        ))}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Facturas</h1>
                    <p className="text-muted-foreground text-sm">{invoices.length} facturas</p>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 px-4 text-left font-medium">Número</th>
                                    <th className="py-3 px-4 text-left font-medium">Cliente</th>
                                    <th className="py-3 px-4 text-left font-medium">Importe</th>
                                    <th className="py-3 px-4 text-left font-medium">Estado</th>
                                    <th className="py-3 px-4 text-right font-medium">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((inv) => (
                                    <tr key={inv.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                        <td className="py-3 px-4 font-medium">{inv.number}</td>
                                        <td className="py-3 px-4">{inv.clientName}</td>
                                        <td className="py-3 px-4">${inv.amount.toFixed(2)}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(inv.status)}`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <InvoiceActions invoiceId={inv.id} currentStatus={inv.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

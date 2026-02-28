"use client";

import React, { useEffect, useState } from "react";
import { DollarSign, FileText, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { getDashboardStats, getRecentInvoices, InvoiceSummary } from "@/lib/api-service";

interface Props {
    accessToken: string;
}

export default function DashboardPanel({ accessToken }: Props) {
    const [stats, setStats] = useState({ totalRevenue: 0, totalInvoices: 0, totalCustomers: 0, growthRate: 0 });
    const [invoices, setInvoices] = useState<InvoiceSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const [s, inv] = await Promise.all([
                getDashboardStats(accessToken),
                getRecentInvoices(accessToken),
            ]);
            setStats(s);
            setInvoices(inv);
            setLoading(false);
        }
        load();
    }, [accessToken]);

    if (loading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-6">
                            <div className="h-16 animate-pulse bg-muted rounded" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const statsData = [
        { title: "Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: <DollarSign className="h-5 w-5" /> },
        { title: "Facturas", value: stats.totalInvoices, icon: <FileText className="h-5 w-5" /> },
        { title: "Clientes", value: stats.totalCustomers, icon: <Users className="h-5 w-5" /> },
        { title: "Growth", value: `${stats.growthRate}%`, icon: <TrendingUp className="h-5 w-5" /> },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground text-sm">Resumen general</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat, i) => (
                    <Card key={i}>
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                                    <p className="text-xl font-bold mt-1">{stat.value}</p>
                                </div>
                                <div className="p-2.5 rounded-lg bg-muted">
                                    {stat.icon}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Invoices (últimas 5) */}
            <Card>
                <CardContent className="p-5">
                    <h2 className="font-semibold mb-3">Facturas recientes</h2>
                    <div className="space-y-3">
                        {invoices.slice(0, 5).map((inv) => (
                            <div key={inv.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                <div>
                                    <p className="text-sm font-medium">{inv.clientName}</p>
                                    <p className="text-xs text-muted-foreground">{inv.number}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold">${inv.amount.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground capitalize">{inv.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

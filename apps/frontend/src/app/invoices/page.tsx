import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { getRecentInvoices, InvoiceSummary } from "@/lib/api-service";
import InvoiceActions from "../components/invoice/InvoiceActions";

export default async function InvoicesPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const accessToken = (session as any).accessToken as string;
  const invoices: InvoiceSummary[] = await getRecentInvoices(accessToken);

  const getStatusBadge = (status: InvoiceSummary["status"]) => {
    const statusClasses: Record<InvoiceSummary["status"], string> = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      overdue: "bg-red-100 text-red-800",
      cancelled: "bg-gray-200 text-gray-700",
      draft: "bg-blue-100 text-blue-800",
    };
    const label = status.charAt(0).toUpperCase() + status.slice(1);
    const cls = statusClasses[status] ?? "bg-gray-100 text-gray-800";
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${cls}`}>{label}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Facturas</h1>
            <p className="text-gray-600">Listado general de facturas</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Volver al Dashboard</Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Todas las facturas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left">Número</th>
                    <th className="py-3 text-left">Cliente</th>
                    <th className="py-3 text-left">Importe</th>
                    <th className="py-3 text-left">Estado</th>
                    <th className="py-3 text-left">Creación</th>
                    <th className="py-3 text-left">Vencimiento</th>
                    <th className="py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b">
                      <td className="py-2">{inv.number}</td>
                      <td className="py-2">{inv.clientName}</td>
                      <td className="py-2">$ {inv.amount.toFixed(2)}</td>
                      <td className="py-2">{getStatusBadge(inv.status)}</td>
                      <td className="py-2">{inv.createdAt ? new Date(inv.createdAt).toLocaleDateString() : '-'}</td>
                      <td className="py-2">{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : '-'}</td>
                      <td className="py-2 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/invoices/${inv.id}`}>
                            <Button variant="ghost" size="sm">Ver</Button>
                          </Link>
                          <InvoiceActions invoiceId={inv.id} currentStatus={inv.status} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
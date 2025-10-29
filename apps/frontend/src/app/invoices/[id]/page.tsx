import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getInvoiceById } from "@/lib/api-service";
import { Invoice } from "@/lib/types";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import InvoiceDetailClient from "./InvoiceDetailClient";


interface Props {
  params: { id: string };
}

export default async function InvoiceDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const accessToken = (session as any).accessToken as string;
  const invoice: Invoice = await getInvoiceById(accessToken, params.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Factura {invoice.invoiceNumber}</h1>
            <p className="text-gray-600">Detalle y vista previa</p>
          </div>
          <Link href="/invoices">
            <Button variant="outline">Volver al listado</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Detalle */}
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Cliente:</span> {invoice.customer?.name}</div>
                <div><span className="font-medium">Email:</span> {invoice.customer?.email}</div>
                <div><span className="font-medium">Fecha:</span> {new Date(invoice.issueDate).toLocaleDateString()}</div>
                <div><span className="font-medium">Vencimiento:</span> {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}</div>
                <div><span className="font-medium">Estado:</span> {invoice.status}</div>
                <div><span className="font-medium">Total:</span> € {invoice.total?.toFixed(2)}</div>
              </div>

              {/* Vista previa y acciones cliente */}
              <div>
                <InvoiceDetailClient invoice={invoice} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
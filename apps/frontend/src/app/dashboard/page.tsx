import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Plus, FileText, DollarSign, Users, TrendingUp } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import Link from "next/link";
import { getDashboardStats, getRecentInvoices, InvoiceSummary } from "@/lib/api-service";
import UserMenu from "../components/auth/UserMenu";
import InvoiceActions from "../components/invoice/InvoiceActions";



export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  console.log("Server Session Object:", JSON.stringify(session, null, 2));

  // Obtenemos los datos reales usando el accessToken
  const accessToken = session.accessToken as string;
  const stats = await getDashboardStats(accessToken);
  const recentInvoices = await getRecentInvoices(accessToken);

  const statsData = [
    { title: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: <DollarSign className="h-6 w-6 text-gray-500" /> },
    { title: 'Invoices', value: stats.totalInvoices, icon: <FileText className="h-6 w-6 text-gray-500" /> },
    { title: 'Customers', value: stats.totalCustomers, icon: <Users className="h-6 w-6 text-gray-500" /> },
    { title: 'Growth', value: stats.growthRate, icon: <TrendingUp className="h-6 w-6 text-gray-500" /> },
  ];

  // Función para mostrar el estado de la factura con el color adecuado
  const getStatusBadge = (status: InvoiceSummary['status']) => {
    const statusClasses = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      overdue: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">InvoiceFlow</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/create-invoice">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Invoice
                </Button>
              </Link>
              <Link href="/customers/new">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear cliente
                </Button>
              </Link>
              <UserMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {session.user?.email}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-full bg-gray-100">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Invoices Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Invoices</CardTitle>
            <Link href="/invoices">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left">Invoice</th>
                    <th className="py-3 text-left">Client</th>
                    <th className="py-3 text-left">Amount</th>
                    <th className="py-3 text-left">Status</th>
                    <th className="py-3 text-left">Date</th>
                    <th className="py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b">
                      <td className="py-2">{invoice.number}</td>
                      <td className="py-2">{invoice.clientName}</td>
                      <td className="py-2">${invoice.amount.toFixed(2)}</td>
                      <td className="py-2">{getStatusBadge(invoice.status)}</td>
                      <td className="py-2">{invoice.date}</td>
                      <td className="py-2 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/invoices/${invoice.id}`}>
                            <Button variant="ghost" size="sm">Ver</Button>
                          </Link>
                          <InvoiceActions invoiceId={invoice.id} currentStatus={invoice.status} />
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
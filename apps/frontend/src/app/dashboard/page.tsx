// apps/frontend/src/app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import { Plus, FileText, DollarSign, Users, TrendingUp } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";



export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // TODO: Aquí puedes hacer un fetch de estadísticas o facturas con session.accessToken

  const statsData = [
    { title: 'Total Revenue', value: `$12,345.67`, icon: <DollarSign className="h-6 w-6 text-gray-500" /> },
    { title: 'Invoices', value: 42, icon: <FileText className="h-6 w-6 text-gray-500" /> },
    { title: 'Customers', value: 18, icon: <Users className="h-6 w-6 text-gray-500" /> },
    { title: 'Growth', value: '+12.5%', icon: <TrendingUp className="h-6 w-6 text-gray-500" /> },
  ];

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
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
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

        {/* Recent Invoices Table (pendiente de integración real) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Invoices</CardTitle>
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
                  {/* Aquí irán tus datos reales de facturas */}
                  <tr>
                    <td className="py-2">INV-0001</td>
                    <td className="py-2">Acme Inc.</td>
                    <td className="py-2">$1,200.00</td>
                    <td className="py-2">Paid</td>
                    <td className="py-2">2025-10-12</td>
                    <td className="py-2 text-right">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

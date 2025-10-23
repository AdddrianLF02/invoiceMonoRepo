"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getAllCustomers } from "@/lib/api-service";
import { Customer } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export default function CustomersPage() {
  const { data: session } = useSession();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        if (!session?.accessToken) return;
        const data = await getAllCustomers(session.accessToken);
        setCustomers(data);
      } catch (e) {
        toast.error("Error al cargar clientes");
        console.error(e);
      }
    };
    run();
  }, [session?.accessToken]);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button asChild>
          <Link href="/customers/new">Crear cliente</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.map(c => (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle>{c.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{c.email}</p>
              <p className="text-sm text-gray-600">{c.address}</p>
            </CardContent>
          </Card>
        ))}
        {customers.length === 0 && (
          <Card>
            <CardContent className="py-6">
              <p className="text-gray-600">No hay clientes. Crea tu primer cliente.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
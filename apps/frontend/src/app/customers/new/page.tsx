"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createCustomer } from "@/lib/api-service";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

export default function NewCustomerPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    number: "",
    taxId: "",
  });

  const onChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!session?.accessToken || !session?.user?.id) {
        toast.error("No autorizado");
        return;
      }
      await createCustomer(session.accessToken, {
        ...form,
      });
      toast.success("Cliente creado");
      router.push("/customers");
    } catch (err) {
      toast.error("Error al crear el cliente");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Crear cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nombre</Label>
              <Input value={form.name} onChange={onChange("name")} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={onChange("email")} />
            </div>
            <div>
              <Label>Calle</Label>
              <Input value={form.street} onChange={onChange("street")} />
            </div>
            <div>
              <Label>Ciudad</Label>
              <Input value={form.city} onChange={onChange("city")} />
            </div>
            <div>
              <Label>Código postal</Label>
              <Input value={form.postalCode} onChange={onChange("postalCode")} />
            </div>
            <div>
              <Label>País</Label>
              <Input value={form.country} onChange={onChange("country")} />
            </div>
            <div>
              <Label>Número (opcional)</Label>
              <Input value={form.number} onChange={onChange("number")} />
            </div>
            <div>
              <Label>NIF/CIF (opcional)</Label>
              <Input value={form.taxId} onChange={onChange("taxId")} />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Guardar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
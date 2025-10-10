"use client"

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { InvoiceState, InvoiceAction } from '../hooks/useInvoiceState';

interface InvoiceFormProps {
  state: InvoiceState;
  dispatch: React.Dispatch<InvoiceAction>;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ state, dispatch }) => {
  const { invoiceData, items } = state;

  const handleInvoiceDataChange = (field: keyof typeof invoiceData, value: string) => {
    dispatch({ type: 'UPDATE_INVOICE_DATA', field, value });
  };

  const handleItemChange = (index: number, field: keyof typeof items[0], value: string | number) => {
    dispatch({ type: 'UPDATE_ITEM', index, field, value });
  };

  const addItem = () => {
    dispatch({ type: 'ADD_ITEM' });
  };

  const removeItem = (index: number) => {
    dispatch({ type: 'REMOVE_ITEM', index });
  };

  return (
    <div className="space-y-6">
      {/* Información de la factura */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="invoiceNumber">Número de factura</Label>
              <Input
                id="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={(e) => handleInvoiceDataChange('invoiceNumber', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="date">Fecha de emisión</Label>
              <Input
                id="date"
                type="date"
                value={invoiceData.date}
                onChange={(e) => handleInvoiceDataChange('date', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Fecha de vencimiento</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => handleInvoiceDataChange('dueDate', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información del remitente */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">De (Remitente)</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fromName">Nombre / Empresa</Label>
              <Input
                id="fromName"
                value={invoiceData.fromName}
                onChange={(e) => handleInvoiceDataChange('fromName', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="fromEmail">Email</Label>
              <Input
                id="fromEmail"
                type="email"
                value={invoiceData.fromEmail}
                onChange={(e) => handleInvoiceDataChange('fromEmail', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="fromAddress">Dirección</Label>
              <Textarea
                id="fromAddress"
                value={invoiceData.fromAddress}
                onChange={(e) => handleInvoiceDataChange('fromAddress', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información del destinatario */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Para (Cliente)</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="toName">Nombre / Empresa</Label>
              <Input
                id="toName"
                value={invoiceData.toName}
                onChange={(e) => handleInvoiceDataChange('toName', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="toEmail">Email</Label>
              <Input
                id="toEmail"
                type="email"
                value={invoiceData.toEmail}
                onChange={(e) => handleInvoiceDataChange('toEmail', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="toAddress">Dirección</Label>
              <Textarea
                id="toAddress"
                value={invoiceData.toAddress}
                onChange={(e) => handleInvoiceDataChange('toAddress', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ítems de la factura */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Ítems</h3>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-5">
                  <Input
                    placeholder="Descripción"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="Cantidad"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="Precio"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="Total"
                    value={item.amount}
                    disabled
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addItem} className="mt-2">
              <Plus className="h-4 w-4 mr-2" /> Añadir ítem
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notas */}
      <Card>
        <CardContent className="pt-6">
          <div>
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              value={invoiceData.notes}
              onChange={(e) => handleInvoiceDataChange('notes', e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceForm;
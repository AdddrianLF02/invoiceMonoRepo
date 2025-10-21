
import React from 'react';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface ClassicTemplateProps {
  invoiceData: {
    invoiceNumber: string;
    date: string;
    dueDate: string;
    fromName: string;
    fromEmail: string;
    fromAddress: string;
    toName: string;
    toEmail: string;
    toAddress: string;
    notes: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
}

const ClassicTemplate = ({ invoiceData, items, subtotal, tax, total }: ClassicTemplateProps) => {
  return (
    <div className="bg-white p-8 border-2 border-gray-800">
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center">INVOICE</h2>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-lg font-medium">Invoice #: {invoiceData.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">Date: {invoiceData.date}</p>
            {invoiceData.dueDate && (
              <p className="font-medium">Due Date: {invoiceData.dueDate}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="border border-gray-400 p-4">
          <h3 className="font-bold text-gray-800 mb-3 text-center bg-gray-200 py-1">BILL FROM</h3>
          <div className="text-sm">
            <p className="font-semibold">{invoiceData.fromName}</p>
            <p>{invoiceData.fromEmail}</p>
            <p className="whitespace-pre-line">{invoiceData.fromAddress}</p>
          </div>
        </div>
        <div className="border border-gray-400 p-4">
          <h3 className="font-bold text-gray-800 mb-3 text-center bg-gray-200 py-1">BILL TO</h3>
          <div className="text-sm">
            <p className="font-semibold">{invoiceData.toName}</p>
            <p>{invoiceData.toEmail}</p>
            <p className="whitespace-pre-line">{invoiceData.toAddress}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <table className="w-full border-collapse border-2 border-gray-800">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-600 text-left py-2 px-3 font-bold">DESCRIPTION</th>
              <th className="border border-gray-600 text-center py-2 px-3 font-bold">QTY</th>
              <th className="border border-gray-600 text-center py-2 px-3 font-bold">RATE</th>
              <th className="border border-gray-600 text-center py-2 px-3 font-bold">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-400">
                <td className="border border-gray-400 py-2 px-3 text-sm">{item.description}</td>
                <td className="border border-gray-400 text-center py-2 px-3 text-sm">{item.quantity}</td>
                <td className="border border-gray-400 text-center py-2 px-3 text-sm">${item.rate}</td>
                <td className="border border-gray-400 text-center py-2 px-3 text-sm">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <div className="w-64 border-2 border-gray-800">
          <div className="bg-gray-200 p-2 border-b border-gray-800">
            <h4 className="font-bold text-center">TOTAL</h4>
          </div>
          <div className="p-3">
            <div className="flex justify-between py-1 border-b border-gray-300">
              <span className="font-medium">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-300">
              <span className="font-medium">Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg">
              <span>TOTAL:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {invoiceData.notes && (
        <div className="mt-8 border-2 border-gray-400 p-4">
          <h4 className="font-bold text-gray-800 mb-2 bg-gray-200 py-1 px-2">NOTES</h4>
          <p className="text-sm whitespace-pre-line">{invoiceData.notes}</p>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;

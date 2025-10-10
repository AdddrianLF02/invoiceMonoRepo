
import React from 'react';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface MinimalTemplateProps {
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

const MinimalTemplate = ({ invoiceData, items, subtotal, tax, total }: MinimalTemplateProps) => {
  return (
    <div className="bg-white p-8">
      <div className="mb-12">
        <h2 className="text-2xl font-light text-gray-800 mb-2">Invoice</h2>
        <div className="w-16 h-px bg-emerald-500 mb-6"></div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">#{invoiceData.invoiceNumber}</span>
          <div className="text-right text-gray-600">
            <p>{invoiceData.date}</p>
            {invoiceData.dueDate && <p>Due: {invoiceData.dueDate}</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-16 mb-12">
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">From</h3>
          <div className="text-sm text-gray-800">
            <p className="font-medium mb-1">{invoiceData.fromName}</p>
            <p className="text-gray-600 mb-1">{invoiceData.fromEmail}</p>
            <p className="text-gray-600 whitespace-pre-line">{invoiceData.fromAddress}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">To</h3>
          <div className="text-sm text-gray-800">
            <p className="font-medium mb-1">{invoiceData.toName}</p>
            <p className="text-gray-600 mb-1">{invoiceData.toEmail}</p>
            <p className="text-gray-600 whitespace-pre-line">{invoiceData.toAddress}</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="text-center py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
              <th className="text-center py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
              <th className="text-right py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-4 text-sm text-gray-800">{item.description}</td>
                <td className="text-center py-4 text-sm text-gray-600">{item.quantity}</td>
                <td className="text-center py-4 text-sm text-gray-600">${item.rate}</td>
                <td className="text-right py-4 text-sm text-gray-800">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <div className="w-64">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (10%)</span>
              <span className="text-gray-800">${tax.toFixed(2)}</span>
            </div>
            <div className="w-full h-px bg-gray-200 my-3"></div>
            <div className="flex justify-between text-lg font-medium">
              <span className="text-gray-800">Total</span>
              <span className="text-emerald-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {invoiceData.notes && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Notes</h4>
          <p className="text-sm text-gray-600 whitespace-pre-line">{invoiceData.notes}</p>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;


import React from 'react';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface ModernTemplateProps {
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

const ModernTemplate = ({ invoiceData, items, subtotal, tax, total }: ModernTemplateProps) => {
  return (
    <div className="bg-white p-8 border rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-blue-600">INVOICE</h2>
          <p className="text-gray-600">#{invoiceData.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Date: {invoiceData.date}</p>
          {invoiceData.dueDate && (
            <p className="text-sm text-gray-600">Due: {invoiceData.dueDate}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">From:</h3>
            <div className="text-sm text-blue-800">
              <p className="font-medium">{invoiceData.fromName}</p>
              <p>{invoiceData.fromEmail}</p>
              <p className="whitespace-pre-line">{invoiceData.fromAddress}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">To:</h3>
            <div className="text-sm text-gray-600">
              <p className="font-medium">{invoiceData.toName}</p>
              <p>{invoiceData.toEmail}</p>
              <p className="whitespace-pre-line">{invoiceData.toAddress}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="text-left py-3 px-4 rounded-l-lg font-medium">Description</th>
              <th className="text-right py-3 px-4 font-medium">Qty</th>
              <th className="text-right py-3 px-4 font-medium">Rate</th>
              <th className="text-right py-3 px-4 rounded-r-lg font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-4 text-sm text-gray-700">{item.description}</td>
                <td className="text-right py-3 px-4 text-sm text-gray-700">{item.quantity}</td>
                <td className="text-right py-3 px-4 text-sm text-gray-700">${item.rate}</td>
                <td className="text-right py-3 px-4 text-sm text-gray-700">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <div className="w-64">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between py-1">
              <span className="text-sm text-gray-600">Subtotal:</span>
              <span className="text-sm text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-sm text-gray-600">Tax (10%):</span>
              <span className="text-sm text-gray-900">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-blue-200 font-semibold text-blue-900">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {invoiceData.notes && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Notes:</h4>
          <p className="text-sm text-gray-600 whitespace-pre-line">{invoiceData.notes}</p>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;

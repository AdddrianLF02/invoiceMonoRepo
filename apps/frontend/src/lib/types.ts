export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customer?: Customer;
  status: 'paid' | 'pending' | 'overdue' | 'draft' | 'cancelled';
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
}

export interface InvoiceTotals {
  subtotal: number;
  tax: number;
  total: number;
}

export interface InvoiceDisplay {
  id: string;
  client: string;
  amount: string;
  status: string;
  date: string;
  invoiceData: Invoice;
}
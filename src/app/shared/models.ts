export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  orderQuantity?: number;
  status?: 'In Transit' | 'In Warehouse' | 'Not Dispatched';
}

export interface PlywoodType {
  id: number;
  name: string;
  thickness: string;
  grade: string;
  stock: number;
  pricePerSheet: number;
  description: string;
  orderQuantity?: number;
  status?: 'In Transit' | 'In Warehouse' | 'Not Dispatched';
}

export interface InventoryItem {
  id: number;
  warehouse: string;
  item: string;
  quantity: number;
  reserved: number;
}

export interface Supplier {
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
}

export interface Customer {
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  customerId: number;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdOn: Date;
}

export interface DashboardStat {
  label: string;
  value: string;
  description: string;
}

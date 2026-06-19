export interface PlywoodType {
  id: number;
  name: string;
  thickness: string;
  grade: string;
  finishColor?: string;
  stock: number;
  pricePerSheet: number;
  description: string;
  orderQuantity?: number;
  status?: 'In Transit' | 'In Warehouse' | 'Not Dispatched';
}

export interface PlywoodViewerType {
  id: number;
  name: string;
  thickness: string;
  grade: string;
  finishColor?: string;
  description: string;
  status?: string;
}

export interface InventoryItem {
  id: number;
  warehouse: string;
  item: string;
  quantity: number;
  reserved: number;
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

export interface DashboardStats {
  totalVariants: number;
  inWarehouse: number;
  inTransit: number;
  notDispatched: number;
  totalCustomers: number;
  totalOrders: number;
}

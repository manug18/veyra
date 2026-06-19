import { Injectable } from '@angular/core';
import { Customer, DashboardStat, InventoryItem, Order, PlywoodType, Product, Supplier } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class InventoryApiService {
  private customers: Customer[] = [
    { id: 1, companyName: 'Enterprise Tech Pvt Ltd', contactName: 'Sahil Verma', email: 'sahil@enterprisetech.com', phone: '+91 90000 11111' },
    { id: 2, companyName: 'Campus Networks', contactName: 'Deepa Nair', email: 'deepa@campusnetworks.com', phone: '+91 90000 22222' },
    { id: 3, companyName: 'Manufacturing One', contactName: 'Amit Joshi', email: 'amit@manufacturingone.com', phone: '+91 90000 33333' }
  ];

  private products: Product[] = [
    {
      id: 1,
      name: 'Plywood Sheets (17 types)',
      sku: 'PLY-17T',
      category: 'Plywood',
      stock: 150,
      price: 45,
      orderQuantity: 0,
      status: 'In Warehouse'
    }
  ];

  private plywoodTypes: PlywoodType[] = [
    { id: 1, name: 'Exterior BWR', thickness: '12mm', grade: 'BWR', stock: 40, pricePerSheet: 52, description: 'Weather-resistant plywood for furniture and cabinets.', orderQuantity: 0, status: 'In Warehouse' },
    { id: 2, name: 'Commercial BWP', thickness: '18mm', grade: 'BWP', stock: 28, pricePerSheet: 78, description: 'Moisture-proof plywood for construction and joinery.', orderQuantity: 0, status: 'In Transit' },
    { id: 3, name: 'MR Grade', thickness: '9mm', grade: 'MR', stock: 30, pricePerSheet: 38, description: 'General-purpose interior plywood for panels and partitions.', orderQuantity: 0, status: 'Not Dispatched' },
    { id: 4, name: 'Bamboo Plywood', thickness: '15mm', grade: 'Eco', stock: 18, pricePerSheet: 95, description: 'Eco-friendly plywood with high strength and smooth finish.', orderQuantity: 0, status: 'In Warehouse' },
    { id: 5, name: 'Decorative Laminate', thickness: '12mm', grade: 'A', stock: 34, pricePerSheet: 88, description: 'Surface-ready plywood for premium furniture and fixtures.', orderQuantity: 0, status: 'In Transit' }
  ];

  private orders: Order[] = [];

  getDashboardStats(): DashboardStat[] {
    const inWarehouse = this.plywoodTypes.filter((p) => p.status === 'In Warehouse').length;
    const inTransit = this.plywoodTypes.filter((p) => p.status === 'In Transit').length;
    return [
      { label: 'Plywood variants', value: String(this.plywoodTypes.length), description: 'Active variants of plywood' },
      { label: 'In warehouse', value: String(inWarehouse), description: 'Variants available for order now' },
      { label: 'In transit', value: String(inTransit), description: 'Variants currently in transit' },
      { label: 'Customers', value: String(this.customers.length), description: 'Active B2B client accounts' }
    ];
  }

  getProducts(): Product[] {
    return this.products;
  }

  getPlywoodTypes(): PlywoodType[] {
    return this.plywoodTypes;
  }

  addPlywoodType(item: PlywoodType) {
    const nextId = this.plywoodTypes.length
      ? Math.max(...this.plywoodTypes.map((p) => p.id)) + 1
      : 1;
    this.plywoodTypes.push({ ...item, id: nextId, orderQuantity: 0 });
  }

  getInventory(): InventoryItem[] {
    return [
      { id: 1, warehouse: 'Mumbai HQ', item: 'Industrial Router', quantity: 48, reserved: 8 },
      { id: 2, warehouse: 'Delhi Warehouse', item: 'Rack Mount Switch', quantity: 20, reserved: 3 },
      { id: 3, warehouse: 'Bangalore Hub', item: 'Server Chassis', quantity: 15, reserved: 6 },
      { id: 4, warehouse: 'Mumbai HQ', item: 'UPS Backup', quantity: 68, reserved: 18 }
    ];
  }

  getSuppliers(): Supplier[] {
    return [
      { id: 1, name: 'Power Solutions Ltd.', contact: 'Rohit Sharma', phone: '+91 98765 43210', email: 'rohit@powersolutions.in' },
      { id: 2, name: 'NetGear Distributors', contact: 'Priya Patel', phone: '+91 91234 56789', email: 'priya@netgeardist.com' },
      { id: 3, name: 'Server Parts Co.', contact: 'Anil Mehra', phone: '+91 99887 66554', email: 'anil@serverparts.co' }
    ];
  }

  getCustomers(): Customer[] {
    return this.customers;
  }

  addCustomer(customer: Customer) {
    const nextId = this.customers.length ? Math.max(...this.customers.map((item) => item.id)) + 1 : 1;
    this.customers.push({ ...customer, id: nextId });
  }

  getOrders(): Order[] {
    return this.orders;
  }

  addOrder(order: Order) {
    const nextId = this.orders.length ? Math.max(...this.orders.map((item) => item.id)) + 1 : 1;
    this.orders.push({ ...order, id: nextId });
  }
}

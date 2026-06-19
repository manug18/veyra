import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Customer, DashboardStat, DashboardStats, Order, OrderItem, PlywoodType } from '../shared/models';

// Backend DTO shapes
interface VariantAdminDto {
  id: number; name: string; thickness: string; grade: string;
  finishColor: string; description: string; stock: number;
  pricePerSheet: number; status: string;
}
interface BackendCustomer { id: number; companyName: string; contactName: string; email: string; phone: string; }
interface BackendOrder {
  id: number; customerName: string; total: number; status: string; createdAt: string;
  items: { variantId: number; variantName: string; quantity: number; unitPrice: number; }[];
}
interface BackendOrderRequest {
  customerId: number;
  items: { variantId: number; quantity: number; }[];
}

const BASE = 'http://localhost:8080/api';

const STATUS_MAP: Record<string, PlywoodType['status']> = {
  IN_WAREHOUSE: 'In Warehouse',
  IN_TRANSIT: 'In Transit',
  NOT_DISPATCHED: 'Not Dispatched',
};
const STATUS_REVERSE: Record<string, string> = {
  'In Warehouse': 'IN_WAREHOUSE',
  'In Transit': 'IN_TRANSIT',
  'Not Dispatched': 'NOT_DISPATCHED',
};

@Injectable({ providedIn: 'root' })
export class InventoryApiService {

  constructor(private http: HttpClient) {}

  // --- Variants ---
  getPlywoodTypes(): Observable<PlywoodType[]> {
    return this.http.get<VariantAdminDto[]>(`${BASE}/variants`).pipe(
      map((list) => list.map(this.toPlywood))
    );
  }

  addPlywoodType(v: Partial<PlywoodType>): Observable<PlywoodType> {
    const body = {
      id: null, name: v.name, thickness: v.thickness, grade: v.grade,
      finishColor: v.finishColor ?? '', description: v.description,
      stock: v.stock, pricePerSheet: v.pricePerSheet,
      status: STATUS_REVERSE[v.status ?? 'In Warehouse'] ?? 'IN_WAREHOUSE'
    };
    return this.http.post<VariantAdminDto>(`${BASE}/variants`, body).pipe(
      map(this.toPlywood)
    );
  }

  // --- Customers ---
  getCustomers(): Observable<Customer[]> {
    return this.http.get<BackendCustomer[]>(`${BASE}/customers`);
  }

  addCustomer(c: Omit<Customer, 'id'>): Observable<Customer> {
    return this.http.post<BackendCustomer>(`${BASE}/customers`, c);
  }

  // --- Orders ---
  getOrders(): Observable<Order[]> {
    return this.http.get<BackendOrder[]>(`${BASE}/orders`).pipe(
      map((list) => list.map(this.toOrder))
    );
  }

  addOrder(customerId: number, items: OrderItem[]): Observable<Order> {
    const body: BackendOrderRequest = {
      customerId,
      items: items.map((i) => ({ variantId: i.productId, quantity: i.quantity }))
    };
    return this.http.post<BackendOrder>(`${BASE}/orders`, body).pipe(
      map(this.toOrder)
    );
  }

  // --- Dashboard ---
  getDashboardStats(): Observable<DashboardStat[]> {
    return this.http.get<DashboardStats>(`${BASE}/dashboard`).pipe(
      map((s) => [
        { label: 'Plywood variants', value: String(s.totalVariants), description: 'Active variants of plywood' },
        { label: 'In warehouse', value: String(s.inWarehouse), description: 'Variants available for order now' },
        { label: 'In transit', value: String(s.inTransit), description: 'Variants currently in transit' },
        { label: 'Customers', value: String(s.totalCustomers), description: 'Active B2B client accounts' },
        { label: 'Total orders', value: String(s.totalOrders), description: 'All orders placed' },
      ])
    );
  }

  // --- Mappers ---
  private toPlywood = (d: VariantAdminDto): PlywoodType => ({
    id: d.id, name: d.name, thickness: d.thickness, grade: d.grade,
    finishColor: d.finishColor, description: d.description,
    stock: d.stock, pricePerSheet: d.pricePerSheet,
    status: STATUS_MAP[d.status] ?? 'Not Dispatched',
  });

  private toOrder = (d: BackendOrder): Order => ({
    id: d.id, customerId: 0, customerName: d.customerName,
    total: d.total, status: d.status, createdOn: new Date(d.createdAt),
    items: d.items.map((i) => ({
      productId: i.variantId, productName: i.variantName,
      quantity: i.quantity, unitPrice: i.unitPrice,
    })),
  });
}

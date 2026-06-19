import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryApiService } from '../../services/inventory-api.service';
import { Customer, Order, OrderItem, PlywoodType } from '../../shared/models';

@Component({
  standalone: true,
  selector: 'app-orders-page',
  imports: [CommonModule, FormsModule],
  template: `
    <section class="page page-orders">
      <div class="page-header">
        <div>
          <h1>Orders</h1>
          <p>Create sales orders for customers by selecting plywood variants and quantities.</p>
        </div>
      </div>

      <div class="order-panel mb-4">
        <div class="row g-3">
          <div class="col-12 col-md-4">
            <label class="form-label">Customer</label>
            <select class="form-select" [(ngModel)]="selectedCustomerId">
              <option [ngValue]="null">Select customer</option>
              <option *ngFor="let customer of customers" [ngValue]="customer.id">
                {{ customer.companyName }}
              </option>
            </select>
          </div>

          <div class="col-12 col-md-4">
            <label class="form-label">Plywood variant</label>
            <select class="form-select" [(ngModel)]="selectedVariantId">
              <option [ngValue]="null">Select variant</option>
              <option *ngFor="let v of availableVariants" [ngValue]="v.id">
                {{ v.name }} &mdash; {{ v.thickness }} ({{ v.stock }} in stock)
              </option>
            </select>
          </div>

          <div class="col-12 col-md-2">
            <label class="form-label">Quantity</label>
            <input
              type="number"
              class="form-control"
              [(ngModel)]="orderQuantity"
              min="1"
              [max]="selectedVariant ? selectedVariant.stock : null"
            />
          </div>

          <div class="col-12 col-md-2 d-flex align-items-end">
            <button class="btn btn-primary w-100" type="button" (click)="addOrderItem()" [disabled]="!canAddItem()">
              Add item
            </button>
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <h5>Order draft</h5>
          <p class="text-muted">Build the order, then submit it.</p>

          <div *ngIf="orderItems.length > 0; else emptyDraft">
            <div class="table-responsive">
              <table class="table table-borderless align-middle">
                <thead>
                  <tr>
                    <th>Variant</th>
                    <th>Qty</th>
                    <th>Price/sheet</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of orderItems; let i = index">
                    <td>{{ item.productName }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>&#8377;{{ item.unitPrice }}</td>
                    <td>&#8377;{{ item.quantity * item.unitPrice }}</td>
                    <td>
                      <button class="btn btn-sm btn-outline-danger" type="button" (click)="removeOrderItem(i)">Remove</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <div><strong>Order total: &#8377;{{ orderTotal() }}</strong></div>
              <button class="btn btn-success" type="button" (click)="submitOrder()" [disabled]="!canSubmitOrder()">
                Submit order
              </button>
            </div>
          </div>

          <ng-template #emptyDraft>
            <div class="alert alert-info mb-0">Select a customer and add a variant to start an order.</div>
          </ng-template>
        </div>
      </div>

      <div class="section-label">Order history</div>
      <div class="table-responsive mt-2">
        <table class="table table-hover align-middle">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of orders">
              <td class="text-muted small">{{ order.id }}</td>
              <td><strong>{{ order.customerName }}</strong></td>
              <td>{{ order.items.length }}</td>
              <td>&#8377;{{ order.total }}</td>
              <td><span class="badge bg-warning text-dark">{{ order.status }}</span></td>
              <td>{{ order.createdOn | date:'mediumDate' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class OrdersPage implements OnInit {
  customers: Customer[] = [];
  variants: PlywoodType[] = [];
  orders: Order[] = [];

  selectedCustomerId: number | null = null;
  selectedVariantId: number | null = null;
  orderQuantity = 1;
  orderItems: OrderItem[] = [];

  constructor(private readonly api: InventoryApiService) {}

  ngOnInit(): void {
    this.api.getCustomers().subscribe((c) => (this.customers = c));
    this.api.getPlywoodTypes().subscribe((v) => (this.variants = v));
    this.loadOrders();
  }

  private loadOrders(): void {
    this.api.getOrders().subscribe((o) => (this.orders = o));
  }

  get availableVariants(): PlywoodType[] {
    return this.variants.filter((v) => v.stock > 0);
  }

  get selectedVariant(): PlywoodType | undefined {
    return this.variants.find((v) => v.id === this.selectedVariantId);
  }

  canAddItem(): boolean {
    return !!this.selectedCustomerId && !!this.selectedVariant &&
      this.orderQuantity > 0 && this.orderQuantity <= (this.selectedVariant?.stock ?? 0);
  }

  addOrderItem() {
    if (!this.selectedVariant) return;
    const existing = this.orderItems.find((item) => item.productId === this.selectedVariantId);
    if (existing) {
      existing.quantity = Math.min(this.selectedVariant.stock, existing.quantity + this.orderQuantity);
    } else {
      this.orderItems.push({
        productId: this.selectedVariant.id,
        productName: this.selectedVariant.name,
        quantity: this.orderQuantity,
        unitPrice: this.selectedVariant.pricePerSheet
      });
    }
    this.orderQuantity = 1;
  }

  removeOrderItem(index: number) {
    this.orderItems.splice(index, 1);
  }

  orderTotal(): number {
    return this.orderItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }

  canSubmitOrder(): boolean {
    return !!this.selectedCustomerId && this.orderItems.length > 0;
  }

  submitOrder() {
    if (!this.canSubmitOrder() || !this.selectedCustomerId) return;
    this.api.addOrder(this.selectedCustomerId, this.orderItems).subscribe({
      next: () => {
        this.loadOrders();
        this.orderItems = [];
        this.selectedVariantId = null;
        this.orderQuantity = 1;
      },
      error: () => {}
    });
  }
}

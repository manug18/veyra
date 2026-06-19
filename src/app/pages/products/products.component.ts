import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryApiService } from '../../services/inventory-api.service';
import { PlywoodType, Product } from '../../shared/models';

const STATUSES = ['In Warehouse', 'In Transit', 'Not Dispatched'] as const;
type Status = typeof STATUSES[number] | 'All';

@Component({
  standalone: true,
  selector: 'app-products-page',
  imports: [CommonModule, FormsModule],
  template: `
    <section class="page page-products">

      <!-- Page header -->
      <div class="prod-page-header mb-3">
        <div>
          <h1 class="prod-page-title">Plywood Variants</h1>
          <p class="prod-page-sub">1 product &bull; manage all 17 plywood variants, their stock and availability.</p>
        </div>
        <button class="btn btn-primary" type="button" (click)="showForm = !showForm">
          {{ showForm ? 'Cancel' : '+ Add variant' }}
        </button>
      </div>

      <!-- Filter tabs -->
      <div class="filter-tabs mb-4">
        <button
          *ngFor="let f of filterOptions"
          class="filter-tab"
          [class.active]="activeFilter === f.value"
          type="button"
          (click)="activeFilter = f.value"
        >
          {{ f.label }}
          <span class="filter-count">{{ countByStatus(f.value) }}</span>
        </button>
      </div>

      <!-- Add variant form -->
      <div *ngIf="showForm" class="add-product-form mb-5">
        <h2 class="form-section-title">New plywood variant</h2>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Product name <span class="req">*</span></label>
            <input class="form-control" [(ngModel)]="draft.name" placeholder="e.g. Exterior BWR" />
          </div>
          <div class="form-group">
            <label class="form-label">Thickness <span class="req">*</span></label>
            <input class="form-control" [(ngModel)]="draft.thickness" placeholder="e.g. 12mm" />
          </div>
          <div class="form-group">
            <label class="form-label">Grade <span class="req">*</span></label>
            <input class="form-control" [(ngModel)]="draft.grade" placeholder="e.g. BWR" />
          </div>
          <div class="form-group">
            <label class="form-label">Stock (units) <span class="req">*</span></label>
            <input type="number" class="form-control" [(ngModel)]="draft.stock" min="0" placeholder="0" />
          </div>
          <div class="form-group">
            <label class="form-label">Price per sheet (&#8377;) <span class="req">*</span></label>
            <input type="number" class="form-control" [(ngModel)]="draft.pricePerSheet" min="0" placeholder="0" />
          </div>
          <div class="form-group">
            <label class="form-label">Status <span class="req">*</span></label>
            <select class="form-select" [(ngModel)]="draft.status">
              <option *ngFor="let s of statuses" [value]="s">{{ s }}</option>
            </select>
          </div>
          <div class="form-group form-group-full">
            <label class="form-label">Description</label>
            <textarea class="form-control" rows="2" [(ngModel)]="draft.description" placeholder="Short description of this plywood type"></textarea>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-success" type="button" (click)="addProduct()" [disabled]="!canAdd()">Save variant</button>
          <button class="btn btn-outline-secondary" type="button" (click)="resetForm()">Clear</button>
        </div>
      </div>

      <!-- Plywood cards -->
      <div class="section-label">{{ filteredLabel }} &mdash; {{ filteredTypes.length }} of {{ plywoodTypes.length }} variants</div>
      <div class="row g-3 mb-5">
        <ng-container *ngFor="let plywood of filteredTypes">
          <div class="col-12 col-md-4">
            <article class="plywood-card shadow-sm h-100">
              <div class="ply-header p-3 d-flex justify-content-between align-items-start">
                <div>
                  <h3 class="ply-title mb-1">{{ plywood.name }}</h3>
                  <p class="ply-subtitle mb-0">{{ plywood.thickness }} &bull; {{ plywood.grade }}</p>
                </div>
                <span class="status-badge" [ngClass]="{
                  'status-in-transit': plywood.status === 'In Transit',
                  'status-in-warehouse': plywood.status === 'In Warehouse',
                  'status-not-dispatched': plywood.status === 'Not Dispatched'
                }">{{ plywood.status }}</span>
              </div>
              <div class="ply-body p-3">
                <p class="text-muted small mb-3">{{ plywood.description }}</p>
                <div class="card-stats">
                  <div class="stat-row">
                    <span class="stat-label">In Stock</span>
                    <strong>{{ plywood.stock }} units</strong>
                  </div>
                  <div class="stat-row">
                    <span class="stat-label">Available</span>
                    <strong class="text-success">{{ availablePlywood(plywood) }} units</strong>
                  </div>
                  <div class="stat-row">
                    <span class="stat-label">Price</span>
                    <strong>&#8377;{{ plywood.pricePerSheet }}/sheet</strong>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </ng-container>
      </div>

      <!-- Variants summary table (removed separate Products table - only one product now) -->

    </section>
  `
})
export class ProductsPage {
  plywoodTypes: PlywoodType[] = [];
  showForm = false;
  statuses = STATUSES;
  activeFilter: Status = 'In Warehouse';

  filterOptions: { label: string; value: Status }[] = [
    { label: 'Available', value: 'In Warehouse' },
    { label: 'In Transit', value: 'In Transit' },
    { label: 'Not Dispatched', value: 'Not Dispatched' },
    { label: 'All', value: 'All' },
  ];

  draft: Partial<PlywoodType> = this.emptyDraft();

  constructor(private readonly api: InventoryApiService) {
    this.plywoodTypes = this.api.getPlywoodTypes();
  }

  get filteredTypes(): PlywoodType[] {
    if (this.activeFilter === 'All') return this.plywoodTypes;
    return this.plywoodTypes.filter((p) => p.status === this.activeFilter);
  }

  get filteredLabel(): string {
    if (this.activeFilter === 'All') return 'All plywood types';
    if (this.activeFilter === 'In Warehouse') return 'Available in warehouse';
    if (this.activeFilter === 'In Transit') return 'In transit';
    return 'Not dispatched';
  }

  countByStatus(status: Status): number {
    if (status === 'All') return this.plywoodTypes.length;
    return this.plywoodTypes.filter((p) => p.status === status).length;
  }

  private emptyDraft(): Partial<PlywoodType> {
    return { name: '', thickness: '', grade: '', stock: 0, pricePerSheet: 0, description: '', status: 'In Warehouse' };
  }

  canAdd(): boolean {
    return !!this.draft.name?.trim() && !!this.draft.thickness?.trim() &&
      !!this.draft.grade?.trim() && (this.draft.stock ?? 0) >= 0 && (this.draft.pricePerSheet ?? 0) >= 0;
  }

  addProduct() {
    if (!this.canAdd()) return;
    this.api.addPlywoodType(this.draft as PlywoodType);
    this.plywoodTypes = this.api.getPlywoodTypes();
    this.resetForm();
    this.showForm = false;
  }

  resetForm() {
    this.draft = this.emptyDraft();
  }

  availablePlywood(plywood: PlywoodType): number {
    return plywood.stock - (plywood.orderQuantity ?? 0);
  }
}

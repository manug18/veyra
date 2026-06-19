import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryApiService } from '../../services/inventory-api.service';
import { Customer } from '../../shared/models';

@Component({
  standalone: true,
  selector: 'app-customers-page',
  imports: [CommonModule, FormsModule],
  template: `
    <section class="page page-customers">
      <div class="page-header d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
        <div>
          <h1>Customers</h1>
          <p>Manage B2B customer accounts, contacts, and order-ready buyers.</p>
        </div>
        <div class="customer-form card p-3 shadow-sm w-100 w-md-auto">
          <h5 class="mb-3">New customer</h5>
          <div class="mb-2">
            <label class="form-label">Company</label>
            <input class="form-control" [(ngModel)]="draft.companyName" placeholder="Company name" />
          </div>
          <div class="mb-2">
            <label class="form-label">Contact</label>
            <input class="form-control" [(ngModel)]="draft.contactName" placeholder="Contact name" />
          </div>
          <div class="mb-2">
            <label class="form-label">Email</label>
            <input class="form-control" [(ngModel)]="draft.email" placeholder="Email address" />
          </div>
          <div class="mb-3">
            <label class="form-label">Phone</label>
            <input class="form-control" [(ngModel)]="draft.phone" placeholder="Phone number" />
          </div>
          <button class="btn btn-primary w-100" type="button" (click)="addCustomer()" [disabled]="!canAddCustomer()">
            Add customer
          </button>
        </div>
      </div>

      <div class="table-responsive mt-4">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let customer of customers">
              <td>{{ customer.companyName }}</td>
              <td>{{ customer.contactName }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class CustomersPage implements OnInit {
  customers: Customer[] = [];
  loading = true;
  draft: Partial<Customer> = {
    companyName: '',
    contactName: '',
    email: '',
    phone: ''
  };

  constructor(private readonly api: InventoryApiService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  private loadCustomers(): void {
    this.loading = true;
    this.api.getCustomers().subscribe({
      next: (c) => { this.customers = c; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  canAddCustomer(): boolean {
    return !!this.draft.companyName && !!this.draft.contactName && !!this.draft.email && !!this.draft.phone;
  }

  addCustomer() {
    if (!this.canAddCustomer()) return;
    this.api.addCustomer({
      companyName: this.draft.companyName!.trim(),
      contactName: this.draft.contactName!.trim(),
      email: this.draft.email!.trim(),
      phone: this.draft.phone!.trim()
    }).subscribe({
      next: () => { this.loadCustomers(); this.draft = { companyName: '', contactName: '', email: '', phone: '' }; },
      error: () => {}
    });
  }
}

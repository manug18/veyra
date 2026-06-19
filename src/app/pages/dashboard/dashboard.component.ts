import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryApiService } from '../../services/inventory-api.service';
import { DashboardStat } from '../../shared/models';

@Component({
  standalone: true,
  selector: 'app-dashboard-page',
  imports: [CommonModule],
  template: `
    <section class="page page-dashboard">
      <div class="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your plywood inventory, orders, and customer activity.</p>
        </div>
      </div>

      <div class="stats-grid">
        <article class="stat-card" *ngFor="let stat of stats">
          <span class="stat-label">{{ stat.label }}</span>
          <strong>{{ stat.value }}</strong>
          <p>{{ stat.description }}</p>
        </article>
      </div>

      <div class="overview-panel">
        <h2>Quick start</h2>
        <p>
          Use <strong>Variants</strong> to manage your 17 plywood types and their stock.
          Use <strong>Orders</strong> to create and track customer sales orders.
          Use <strong>Customers</strong> to manage your B2B accounts.
        </p>
      </div>
    </section>
  `
})
export class DashboardPage {
  stats: DashboardStat[] = [];

  constructor(private readonly api: InventoryApiService) {
    this.stats = this.api.getDashboardStats();
  }
}

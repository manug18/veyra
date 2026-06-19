import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryApiService } from '../../services/inventory-api.service';
import { InventoryItem } from '../../shared/models';

@Component({
  standalone: true,
  selector: 'app-inventory-page',
  imports: [CommonModule],
  template: `
    <section class="page page-inventory">
      <div class="page-header">
        <div>
          <h1>Inventory</h1>
          <p>Monitor warehouse stock and reserved quantities for your hardware supplies.</p>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Warehouse</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Reserved</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of inventory">
              <td>{{ row.warehouse }}</td>
              <td>{{ row.item }}</td>
              <td>{{ row.quantity }}</td>
              <td>{{ row.reserved }}</td>
              <td>{{ row.quantity - row.reserved }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class InventoryPage {
  inventory: InventoryItem[] = [];

  constructor(private readonly api: InventoryApiService) {
    this.inventory = this.api.getInventory();
  }
}

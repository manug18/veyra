import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  inventory: InventoryItem[] = [
    { id: 1, warehouse: 'Mumbai HQ', item: 'Exterior BWR (12mm)', quantity: 40, reserved: 5 },
    { id: 2, warehouse: 'Delhi Warehouse', item: 'Marine Plywood (18mm)', quantity: 12, reserved: 2 },
    { id: 3, warehouse: 'Bangalore Hub', item: 'Film Faced Shuttering', quantity: 50, reserved: 10 },
    { id: 4, warehouse: 'Mumbai HQ', item: 'Birch Plywood (18mm)', quantity: 17, reserved: 3 },
  ];
}

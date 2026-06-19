import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-suppliers-page',
  imports: [CommonModule],
  template: `
    <section class="page page-suppliers">
      <div class="page-header">
        <div>
          <h1>Suppliers</h1>
          <p>Keep supplier contacts and vendor relationships organized.</p>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let supplier of suppliers">
              <td>{{ supplier.name }}</td>
              <td>{{ supplier.contact }}</td>
              <td>{{ supplier.phone }}</td>
              <td>{{ supplier.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class SuppliersPage {
  suppliers: any[] = [];
}

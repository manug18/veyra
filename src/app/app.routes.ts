import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard/dashboard.component';
import { ProductsPage } from './pages/products/products.component';
import { InventoryPage } from './pages/inventory/inventory.component';
import { OrdersPage } from './pages/orders/orders.component';
import { CustomersPage } from './pages/customers/customers.component';

export const routes: Routes = [
  { path: '', component: DashboardPage },
  { path: 'variants', component: ProductsPage },
  { path: 'inventory', component: InventoryPage },
  { path: 'orders', component: OrdersPage },
  { path: 'customers', component: CustomersPage },
  { path: '**', redirectTo: '' }
];

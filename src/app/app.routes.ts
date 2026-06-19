import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard/dashboard.component';
import { ProductsPage } from './pages/products/products.component';
import { InventoryPage } from './pages/inventory/inventory.component';
import { OrdersPage } from './pages/orders/orders.component';
import { CustomersPage } from './pages/customers/customers.component';
import { LoginPage } from './pages/login/login.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: '', component: DashboardPage, canActivate: [authGuard] },
  { path: 'variants', component: ProductsPage, canActivate: [authGuard] },
  { path: 'inventory', component: InventoryPage, canActivate: [authGuard] },
  { path: 'orders', component: OrdersPage, canActivate: [authGuard] },
  { path: 'customers', component: CustomersPage, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];

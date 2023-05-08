import { Route } from '@angular/router';

const layoutRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../../../dashboard/dashboard.component'),
  },
  {
    path: 'categories',
    loadComponent: () => import('../../../categories/categories.component'),
  },
  {
    path: 'products',
    loadComponent: () => import('../../../products/products.component'),
  },

  {
    path: 'orders',
    loadComponent: () => import('../../../orders/orders.component'),
  },
  {
    path: 'users',
    loadComponent: () => import('../../../users/users.component'),
  },
];

export default layoutRoutes;

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
    path: 'categories/form',
    loadComponent: () =>
      import('../../../categories/ui/new-category/new-category.component'),
  },
  {
    path: 'categories/form/:id',
    loadComponent: () =>
      import('../../../categories/ui/edit-category/edit-category.component'),
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

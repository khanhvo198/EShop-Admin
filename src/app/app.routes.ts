import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./shared/ui/layout/layout.component'),
    loadChildren: () => import('./shared/ui/layout/layout.routes'),
  },
];

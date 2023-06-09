import {
  ComponentStore,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';

import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { exhaustMap, pipe } from 'rxjs';
import { Category } from '../../../shared/data-access/models/category';
import { CategoriesService } from '../../../shared/data-access/services/categories.service';

@Injectable()
export class NewCategoryStore
  extends ComponentStore<{}>
  implements OnStoreInit
{
  private readonly categoriesClient = inject(CategoriesService);
  private router = inject(Router);

  readonly createCategoryEffect = this.effect<Category>(
    pipe(
      exhaustMap((category) =>
        this.categoriesClient.createNewCategory(category).pipe(
          tapResponse(
            (response) => {
              this.router.navigate(['/categories']);
            },
            (error) => console.error(error)
          )
        )
      )
    )
  );

  ngrxOnStoreInit() {
    this.setState({});
  }
}

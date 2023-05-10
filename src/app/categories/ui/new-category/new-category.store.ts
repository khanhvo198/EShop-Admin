import {
  ComponentStore,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';

import { NewCategory } from '../../../shared/data-access/models/category';
import { map, pipe, switchMap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { CategoriesService } from '../../../shared/data-access/services/categories.service';
import { Router } from '@angular/router';

@Injectable()
export class NewCategoryStore
  extends ComponentStore<{}>
  implements OnStoreInit
{
  private readonly categoriesClient = inject(CategoriesService);
  private router = inject(Router);

  readonly createCategory = this.effect<NewCategory>(
    pipe(
      switchMap((category) =>
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

import { Injectable, inject } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
} from '@ngrx/component-store';
import { exhaustMap, pipe, switchMap, tap } from 'rxjs';
import { Category } from '../shared/data-access/models/category';
import { CategoriesService } from '../shared/data-access/services/categories.service';

@Injectable()
export class CategoriesStore
  extends ComponentStore<{ categories: Category[] }>
  implements OnStoreInit, OnStateInit
{
  ngrxOnStoreInit() {
    this.setState({ categories: [] });
  }
  ngrxOnStateInit() {
    this.getAllCategories();
  }

  readonly categories$ = this.select((s) => s.categories, { debounce: true });

  private readonly categoriesClient = inject(CategoriesService);

  readonly getAllCategories = this.effect<void>(
    pipe(
      switchMap(() =>
        this.categoriesClient
          .getCategories()
          .pipe(
            tap((res) => this.patchState({ categories: res.data.categories }))
          )
      )
    )
  );

  readonly deleteCategory = this.effect<string>(
    pipe(
      exhaustMap((id) =>
        this.categoriesClient
          .deleteCategory(id)
          .pipe(
            tap((res) => this.patchState({ categories: res.data.categories }))
          )
      )
    )
  );
}

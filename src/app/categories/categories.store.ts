import { Injectable, inject } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import {
  Category,
  ResponseCategoryApi,
} from '../shared/data-access/models/category';
import { CategoriesService } from '../shared/data-access/services/categories.service';
import { defer, map, pipe, switchMap, tap } from 'rxjs';

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
      switchMap(() => this.categoriesClient.getCategories()),
      tap((res) => this.patchState({ categories: res.data.categories }))
    )
  );

  readonly deleteCategory = this.effect<string>(
    pipe(
      switchMap((id) => this.categoriesClient.deleteCategory(id)),
      tap((res) => this.patchState({ categories: res.data.categories }))
    )
  );
}

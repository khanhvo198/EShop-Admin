import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
} from '@ngrx/component-store';
import { exhaustMap, pipe, switchMap, tap, withLatestFrom } from 'rxjs';
import { Category } from 'src/app/shared/data-access/models/category';
import { CategoriesService } from 'src/app/shared/data-access/services/categories.service';

const initCategory: Category = {
  name: '',
  color: '',
  icon: '',
};

@Injectable()
export class EditCategoryStore
  extends ComponentStore<{ category: Category }>
  implements OnStoreInit, OnStateInit
{
  private readonly categoriesClient = inject(CategoriesService);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  readonly category$ = this.select((s) => s.category);

  private readonly id$ = this.select(
    this.route.params,
    (params) => params['id'] as string
  );

  ngrxOnStoreInit() {
    this.setState({ category: initCategory });
  }

  ngrxOnStateInit() {
    this.getCategoryEffect(this.id$);
  }

  readonly getCategoryEffect = this.effect<string>(
    pipe(
      switchMap((id) =>
        this.categoriesClient
          .getCategoryById(id)
          .pipe(tap((res) => this.patchState({ category: res.data.doc })))
      )
    )
  );

  readonly updateCategoryEffect = this.effect<{
    category: Category;
  }>(
    pipe(
      withLatestFrom(this.id$),
      exhaustMap(([{ category }, id]) =>
        this.categoriesClient.editCategory(id, category).pipe(
          tap((res) => {
            this.router.navigate(['/categories']);
          })
        )
      )
    )
  );
}

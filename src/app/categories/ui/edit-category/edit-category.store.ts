import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
} from '@ngrx/component-store';
import { exhaustMap, pipe, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/shared/data-access/models/category';
import { CategoriesService } from 'src/app/shared/data-access/services/categories.service';

const initSate: Category = {
  name: '',
  color: '',
  icon: '',
};

@Injectable()
export class EditCategoryStore
  extends ComponentStore<{ category: Category }>
  implements OnStoreInit
{
  readonly category$ = this.select((s) => s.category);

  private readonly categoriesClient = inject(CategoriesService);

  private readonly router = inject(Router);

  ngrxOnStoreInit() {
    this.setState({ category: initSate });
  }

  readonly getCategoryById = this.effect<string>(
    pipe(
      switchMap((id) => this.categoriesClient.getCategoryById(id)),
      tap((res: any) => this.patchState({ category: res.data.doc }))
    )
  );

  readonly updateCategoryEffect = this.effect<{
    id: string;
    category: Category;
  }>(
    pipe(
      exhaustMap(({ id, category }) =>
        this.categoriesClient.editCategory(id, category)
      ),
      tap((res: any) => {
        this.router.navigate(['/categories']);
      })
    )
  );
}

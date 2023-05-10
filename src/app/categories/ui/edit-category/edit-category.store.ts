import { Injectable, inject } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
} from '@ngrx/component-store';
import { pipe, switchMap, tap } from 'rxjs';
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

  ngrxOnStoreInit() {
    this.setState({ category: initSate });
  }

  readonly getCategoryById = this.effect<string>(
    pipe(
      switchMap((id) => this.categoriesClient.getCategoryById(id)),
      tap((res: any) => this.patchState({ category: res.data.doc }))
    )
  );
}

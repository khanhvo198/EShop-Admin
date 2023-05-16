import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CategoryFormComponent,
  CategoryFormData,
} from '../../../shared/ui/category-form/category-form.component';
import { CardModule } from 'primeng/card';
import { EditCategoryStore } from './edit-category.store';
import { provideComponentStore } from '@ngrx/component-store';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, CategoryFormComponent, CardModule],
  template: `
    <div class="p-4">
      <p-card header="Edit category">
        <app-category-form
          [isEdit]="true"
          [category]="(this.store.category$ | async)!"
          (categorySubmit)="editCategory($event)"
        ></app-category-form>
      </p-card>
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(EditCategoryStore)],
})
export default class EditCategoryComponent {
  readonly store = inject(EditCategoryStore);

  readonly route = inject(ActivatedRoute);

  editCategory({ name, color, icon }: CategoryFormData) {
    this.store.updateCategoryEffect({
      category: { name, color, icon },
    });
  }
}

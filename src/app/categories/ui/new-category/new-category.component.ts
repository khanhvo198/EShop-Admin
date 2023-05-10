import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import {
  CategoryFormComponent,
  CategoryFormData,
} from '../../../shared/ui/category-form/category-form.component';
import { NewCategoryStore } from './new-category.store';
import { provideComponentStore } from '@ngrx/component-store';

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    CategoryFormComponent,
  ],
  template: `
    <div class="p-4">
      <p-card header="Add new category">
        <app-category-form
          (categorySubmit)="categorySubmit($event)"
        ></app-category-form>
      </p-card>
    </div>
  `,
  providers: [provideComponentStore(NewCategoryStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewCategoryComponent {
  private readonly store = inject(NewCategoryStore);

  categorySubmit({ name, icon, color }: CategoryFormData) {
    this.store.createCategory({ name, icon, color });
  }
}

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
import { Category } from 'src/app/shared/data-access/models/category';

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
export default class EditCategoryComponent implements OnInit {
  readonly store = inject(EditCategoryStore);
  private id = '';
  readonly route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.store.getCategoryById(param['id']);
      this.id = param['id'];
    });
  }

  editCategory({ name, color, icon }: CategoryFormData) {
    this.store.updateCategoryEffect({
      id: this.id,
      category: { name, color, icon },
    });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from '../../../shared/ui/category-form/category-form.component';
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
        ></app-category-form>
      </p-card>
    </div>
  `,
  styleUrls: ['./edit-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(EditCategoryStore)],
})
export default class EditCategoryComponent implements OnInit {
  readonly store = inject(EditCategoryStore);

  readonly route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.store.getCategoryById(param['id']);
    });
  }
}

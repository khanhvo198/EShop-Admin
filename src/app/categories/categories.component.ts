import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../shared/data-access/services/categories.service';
import {
  Category,
  ResponseCategoryApi,
} from '../shared/data-access/models/category';
import { Observable, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    RouterLink,
  ],
  template: `
    <div class="p-4">
      <p-card header="Categories" subheader="List of all categories">
        <p-toolbar>
          <div class="p-toolbar-group-start">
            <p-button
              label="New"
              icon="pi pi-plus"
              class="mr-2"
              styleClass="p-button-success"
              routerLink="form"
            ></p-button>
          </div>
        </p-toolbar>
        <!-- <ng-container *ngIf="categories$ | async as categories"> -->
        <p-table
          [value]="categories"
          styleClass="p-datatable-gridlines"
          [tableStyle]="{ 'min-width': '50rem', 'margin-top': '0.5rem' }"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>Name</th>
              <th>Icon</th>
              <th>Color</th>
              <th>Action</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-category>
            <tr>
              <td>{{ category.name }}</td>
              <td>{{ category.icon }}</td>
              <td>{{ category.color }}</td>
              <td>
                <p-button
                  icon="pi pi-trash"
                  styleClass="p-button-danger mr-2"
                  (click)="deleteCategory(category.id)"
                >
                </p-button>
                <p-button
                  icon="pi pi-pencil"
                  styleClass="p-button-success"
                  (click)="editCategory(category.id)"
                >
                </p-button>
              </td>
            </tr>
          </ng-template>
        </p-table>
        <!-- </ng-container> -->
      </p-card>
    </div>
  `,
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoriesComponent implements OnInit {
  // categories$: Observable<Category[]> = of([]);
  categories: Category[] = [];

  private readonly categoriesClient = inject(CategoriesService);

  ngOnInit() {
    this._getCategories();
    console.log(this.categories);
  }

  deleteCategory(id: string) {
    this.categoriesClient.deleteCategory(id).subscribe((response) => {
      this._getCategories();
    });
  }

  editCategory(id: string) {
    console.log(id);
  }

  private _getCategories() {
    this.categoriesClient
      .getCategories()
      .subscribe((cats: ResponseCategoryApi) => {
        this.categories = cats.data.categories;
        console.log(cats);
      });
  }
}

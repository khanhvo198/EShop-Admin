import { CommonModule, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { Observable, of } from 'rxjs';
import { Category } from '../shared/data-access/models/category';
import { CategoriesStore } from './categories.store';

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

        <p-table
          [value]="(categories$ | async)!"
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
              <td>
                <i
                  style="font-size: 2rem"
                  class="pi"
                  [ngClass]="'pi-' + category.icon"
                ></i>
              </td>
              <td>
                <i
                  class="pi pi-circle-on"
                  style="font-size: 2rem"
                  [ngStyle]="{ color: category.color }"
                ></i>
              </td>
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
      </p-card>
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(CategoriesStore)],
})
export default class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]> = of([]);

  private readonly router = inject(Router);
  private readonly store = inject(CategoriesStore);

  ngOnInit() {
    this.categories$ = this.store.categories$;
  }

  deleteCategory(id: string) {
    this.store.deleteCategory(id);
  }

  editCategory(id: string) {
    this.router.navigate(['categories/form', id]);
  }
}

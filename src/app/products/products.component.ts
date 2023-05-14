import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ProductsStore } from './products.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    RouterLink,
  ],
  template: `
    <div class="p-4">
      <p-card header="Products" subheader="List of all products">
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
          [value]="(products$ | async)!"
          styleClass="p-datatable-gridlines"
          [tableStyle]="{ 'min-width': '50rem', 'margin-top': '0.5rem' }"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Created at</th>
              <th>Action</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-product>
            <tr>
              <td>{{ product.name }}</td>
              <td>
                <img [src]="product.image" width="200px" height="200px" />
              </td>
              <td>
                {{ product.price }}
              </td>
              <td>
                {{ product.stock }}
              </td>
              <td>
                {{ product.category }}
              </td>
              <td>
                {{ product.createdAt }}
              </td>
              <td>
                <p-button
                  icon="pi pi-trash"
                  styleClass="p-button-danger mr-2"
                  (click)="deleteProduct(product.id)"
                >
                </p-button>
                <p-button icon="pi pi-pencil" styleClass="p-button-success">
                </p-button>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(ProductsStore)],
})
export default class ProductsComponent {
  readonly store = inject(ProductsStore);

  readonly products$ = this.store.products$;

  deleteProduct(id: string) {
    this.store.deleteProductEffect(id);
  }
}

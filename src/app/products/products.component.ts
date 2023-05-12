import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from '../shared/data-access/models/category';
import { Product } from '../shared/data-access/models/product';

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
                {{ product.image }}
              </td>
              <td>
                {{ product.price }}
              </td>
              <td>
                {{ product.countInStock }}
              </td>
              <td>
                {{ product.category }}
              </td>
              <td>
                {{ product.createdAt }}
              </td>
              <td>
                <p-button icon="pi pi-trash" styleClass="p-button-danger mr-2">
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
})
export default class ProductsComponent {
  products$: Observable<Product[]> = of([]);
}

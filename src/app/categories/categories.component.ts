import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, CardModule, ToolbarModule, ButtonModule, TableModule, RouterLink],
  template: `
      <div class="p-4">
          <p-card header="Categories" subheader="List of all categories">
              <p-toolbar>
                  <div class="p-toolbar-group-start">
                      <p-button label="New" icon="pi pi-plus" class="mr-2" styleClass="p-button-success" routerLink="form"></p-button>
                  </div>
              </p-toolbar>
              <p-table [value]="categories" styleClass="p-datatable-gridlines" [tableStyle]="{ 'min-width': '50rem', 'margin-top': '0.5rem' }">
                  <ng-template pTemplate="header">
                      <tr>
                          <th>Name</th>
                          <th>Icon</th>
                          <th>Color</th>
                      </tr>
                  </ng-template>
                  <ng-template pTemplate="body" let-product>
                      <tr>
                          <td>{{ product.name }}</td>
                          <td>{{ product.icon }}</td>
                          <td>{{ product.color }}</td>
                      </tr>
                  </ng-template>

              </p-table>
          </p-card>
      </div>
  `,
  styleUrls: ['./categories.component.scss'],
})
export default class CategoriesComponent {

  public categories = [{
    name: 'a',
    icon: 'test',
    color: '#fff'
  }, {
    name: 'b',
    icon: 'test',
    color: '#fff'
  }, {
    name: 'c',
    icon: 'test',
    color: '#fff'
  }]


}

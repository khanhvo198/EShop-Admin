import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { provideComponentStore } from '@ngrx/component-store';
import { UserStore } from './users.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
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
      <p-card header="Users" subheader="List of all users">
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
          [value]="(users$ | async)!"
          styleClass="p-datatable-gridlines"
          [tableStyle]="{ 'min-width': '50rem', 'margin-top': '0.5rem' }"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-user>
            <tr>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.isAdmin }}</td>
              <td>{{ user.country }}</td>

              <td>
                <p-button
                  icon="pi pi-trash"
                  styleClass="p-button-danger mr-2"
                  (click)="deleteUser(user.id)"
                >
                </p-button>
                <p-button
                  icon="pi pi-pencil"
                  styleClass="p-button-success"
                  (click)="editUser(user.id)"
                >
                </p-button>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
  providers: [provideComponentStore(UserStore)],
})
export default class UsersComponent {
  readonly store = inject(UserStore);
  readonly users$ = this.store.users$;

  deleteUser(id: string) {}

  editUser(id: string) {}
}

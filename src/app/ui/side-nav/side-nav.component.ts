import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <ul>
      <li>
        <a routerLink="" routerLinkActive="active" [routerLinkActiveOptions]="{exact : true }"  ><i class="pi pi-home"> </i>Dashboard</a>
      </li>
      <li>
        <a routerLink="/products" routerLinkActive="active" [routerLinkActiveOptions]="{exact : true }" ><i class="pi pi-briefcase"> </i>Products</a>
      </li>
      <li>
        <a routerLink="/categories" routerLinkActive="active" [routerLinkActiveOptions]="{exact : true }" ><i class="pi pi-list"> </i>Categories</a>
      </li>
      <li>
        <a routerLink="/orders" routerLinkActive="active" [routerLinkActiveOptions]="{exact : true }" ><i class="pi pi-shopping-cart"> </i>Orders</a>
      </li>
      <li>
        <a routerLink="/users" routerLinkActive="active" [routerLinkActiveOptions]="{exact : true }" ><i class="pi pi-users"> </i>Users</a>
      </li>
      <li>
        <a class="logout" ><i class="pi pi-sign-out"> </i>Logout</a>
      </li>

    </ul>
  `,
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

}

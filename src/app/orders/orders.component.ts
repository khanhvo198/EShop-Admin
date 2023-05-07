import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>orders works!</p> `,
  styleUrls: ['./orders.component.scss'],
})
export default class OrdersComponent {}

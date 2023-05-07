import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>products works!</p> `,
  styleUrls: ['./products.component.scss'],
})
export default class ProductsComponent {}

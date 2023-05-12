import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>New product</p> `,
})
export default class NewProductComponent {}

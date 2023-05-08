import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, CardModule],
  template: ` <p-card>
    

  </p-card> `,
  styleUrls: ['./categories.component.scss'],
})
export default class CategoriesComponent {}

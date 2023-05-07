import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Layout works</p>`,
  styleUrls: ['./layout.component.scss'],
})
export default class LayoutComponent {}

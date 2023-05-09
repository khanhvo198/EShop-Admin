import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryFormComponent} from "../../../shared/ui/category-form/category-form.component";

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, CategoryFormComponent],
  template: `
    <p>Edit category works</p>
    <app-category-form [isEdit]="true"></app-category-form>
  `,
  styleUrls: ['./edit-category.component.scss']
})
export default class EditCategoryComponent {

}

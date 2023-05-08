import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChipsModule} from "primeng/chips";
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Category} from "../../data-access/models/category";

export interface CategoryFormData {
  name: string,
  icon: string,
  color: string
}
@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ChipsModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <div class="formgrid grid mt-6">
        <div class="field col">
          <label for="name">Name</label>
          <input id="name" type="text" formControlName="name"
                 class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col">
          <label for="icon">Icon</label>
          <input id="icon" type="text" formControlName="icon"
                 class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col">
          <label for="color">Color</label>
          <input id="color" type="text" formControlName="color"
                 class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
      </div>
    </form>
  `,
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  @Input() set category(category: Category) {
    this.form.setValue({
      name: category.name,
      icon: category.icon,
      color: category.color
    })
  }

  @Output() categorySubmit = new EventEmitter<CategoryFormData>();
  readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required]],
    icon: ['', [Validators.required]],
    color: ['', [Validators.required]]
  })







}

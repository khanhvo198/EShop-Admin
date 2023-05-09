import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsModule } from 'primeng/chips';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../../data-access/models/category';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';

export interface CategoryFormData {
  name: string;
  icon: string;
  color: string;
}
@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ChipsModule,
    ReactiveFormsModule,
    ToolbarModule,
    ButtonModule,
    ColorPickerModule,
  ],
  template: `
    <p-toolbar>
      <div class="p-toolbar-group-start"></div>
      <div class="p-toolbar-group-end">
        <p-button
          label="{{ isEdit ? 'Update' : 'Save' }}"
          icon="pi pi-plus"
          class="mr-2"
          styleClass="p-button-primary"
          (click)="submit()"
        ></p-button>
        <p-button
          label="Cancel"
          icon="pi pi-arrow-circle-left"
          class="mr-2"
          styleClass="p-button-secondary"
        ></p-button>
      </div>
    </p-toolbar>
    <form [formGroup]="form">
      <div class="formgrid grid mt-6">
        <div class="field col">
          <label for="name">Name</label>
          <input
            id="name"
            type="text"
            formControlName="name"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div class="field col">
          <label for="icon">Icon</label>
          <input
            id="icon"
            type="text"
            formControlName="icon"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div class="field col flex flex-column">
          <label for="color">Color</label>
          <!-- <input
            id="color"
            type="text"
            formControlName="color"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          /> -->
          <p-colorPicker
            id="color"
            formControlName="color"
            class="p-1"
          ></p-colorPicker>
        </div>
      </div>
    </form>
  `,
  styleUrls: ['./category-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent {
  @Input() isEdit = false;

  @Input() set category(category: Category) {
    this.form.setValue({
      name: category.name,
      icon: category.icon,
      color: category.color,
    });
  }

  @Output() categorySubmit = new EventEmitter<CategoryFormData>();
  readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required]],
    icon: ['', [Validators.required]],
    color: ['', [Validators.required]],
  });

  submit() {
    this.categorySubmit.emit(this.form.getRawValue());
  }
}

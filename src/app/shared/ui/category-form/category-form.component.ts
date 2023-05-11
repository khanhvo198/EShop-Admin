import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToolbarModule } from 'primeng/toolbar';
import { Category } from '../../data-access/models/category';

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
          (click)="onCancel()"
        ></p-button>
      </div>
    </p-toolbar>
    <form [formGroup]="form">
      <div class="formgrid grid mt-6">
        <div class="field col flex flex-column">
          <label for="name">Name</label>
          <input
            id="name"
            type="text"
            formControlName="name"
            pInputText
            [class]="
              this.form.controls.name.invalid && this.isSubmit
                ? 'ng-invalid ng-dirty'
                : ''
            "
          />
          <span
            *ngIf="this.form.controls.name.invalid && this.isSubmit"
            style="color: var(--red-600)"
            >Please input name</span
          >
        </div>
        <div class="field col flex flex-column">
          <label for="icon">Icon</label>
          <input
            id="icon"
            type="text"
            formControlName="icon"
            pInputText
            [class]="
              this.form.controls.icon.invalid && this.isSubmit
                ? 'ng-invalid ng-dirty'
                : ''
            "
          />
          <span
            *ngIf="this.form.controls.icon.invalid && this.isSubmit"
            style="color: var(--red-600)"
            >Please input icon</span
          >
        </div>
        <div class="field col flex flex-column">
          <label for="color">Color</label>
          <p-colorPicker
            id="color"
            formControlName="color"
            class="p-1"
          ></p-colorPicker>
        </div>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent {
  isSubmit = false;

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
    color: ['#000000', [Validators.required]],
  });

  readonly router = inject(Router);
  submit() {
    if (!this.form.invalid) {
      this.categorySubmit.emit(this.form.getRawValue());
    }

    this.isSubmit = true;
  }
  onCancel() {
    this.router.navigate(['categories']);
  }
}

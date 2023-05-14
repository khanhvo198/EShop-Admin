import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { Observable, ReplaySubject, map, of } from 'rxjs';
import { Category } from '../../data-access/models/category';
import { Product } from '../../data-access/models/product';
import { CategoriesService } from '../../data-access/services/categories.service';
import { EditorModule } from 'primeng/editor';

export interface ProductFormData {
  name: string;
  description: string;
  brand: string;
  price: string;
  category: Category;
  stock: number;
  isFeatured: boolean;
}

export interface CategoryData {
  name: string;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    DropdownModule,
    CommonModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    InputSwitchModule,
    ReactiveFormsModule,
    EditorModule,
  ],
  template: ` <p-toolbar>
      <div class="p-toolbar-group-start"></div>
      <div class="p-toolbar-group-end">
        <p-button
          label="Save"
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
        <div class="field col-4 flex flex-column">
          <label for="name">Name</label>
          <input id="name" type="text" formControlName="name" pInputText />
        </div>
        <div class="field col-4 flex flex-column">
          <label for="brand">Brand</label>
          <input id="brand" type="text" formControlName="brand" pInputText />
        </div>
        <div class="field col-4 flex flex-column">
          <label for="price">Price</label>
          <input id="price" type="number" formControlName="price" pInputText />
        </div>
        <div class="field col-4 flex flex-column">
          <label for="stock">Stock</label>
          <input id="stock" type="text" formControlName="stock" pInputText />
        </div>
        <div class="field col-4 ">
          <label for="category">Category</label><br />
          <p-dropdown
            [options]="(categories$ | async)!"
            optionLabel="name"
            autoWidth="false"
            [style]="{ width: '100%' }"
            formControlName="category"
          ></p-dropdown>
        </div>
        <div class="field col-4 flex flex-column">
          <label for="featured">Featured</label>
          <p-inputSwitch formControlName="isFeatured"></p-inputSwitch>
        </div>
        <div class="field col-12 flex flex-column">
          <label for="description">Description</label>
          <textarea
            id="description"
            type="text"
            formControlName="description"
            pInputTextarea
            rows="5"
          ></textarea>
        </div>
        <div class="field col-12 flex flex-column">
          <label for="richDescription">Product Detail</label>
          <p-editor
            formControlName="richDescription"
            [style]="{ height: '320px' }"
          ></p-editor>
        </div>
        <div class="field col-12 flex flex-column">
          <label for="images">Main image</label>
          <input
            type="file"
            pInputText
            multiple="false"
            (change)="onChangeImage($event)"
          />
          <div class="col-4 flex flex-column p-0 mt-3">
            <img [src]="(this.image$ | async)!" />
          </div>
        </div>
      </div>
    </form>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent {
  readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    price: ['', [Validators.required]],
    stock: [0, [Validators.required]],
    category: [{} as Category, [Validators.required]],
    isFeatured: [false, [Validators.required]],
    description: ['', [Validators.required]],
    richDescription: [''],
  });

  categories$: Observable<Category[]> = of([]);
  private imageSubject = new ReplaySubject<string | ArrayBuffer>();
  image$: Observable<string | ArrayBuffer> = of('');
  image: File = {} as File;

  readonly categoriesClient = inject(CategoriesService);

  ngOnInit() {
    this.categories$ = this.categoriesClient
      .getCategories()
      .pipe(map((res) => res.data.categories));
    this.image$ = this.imageSubject.asObservable();
  }

  @Input() isEdit = false;

  @Input() product(product: Product) {
    this.form.setValue({
      name: product.name,
      brand: product.brand,
      price: product.price,
      stock: product.countInStock,
      category: product.category,
      isFeatured: product.isFeatured,
      description: product.description,
      richDescription: product.richDescription,
    });
  }

  @Output() productSubmit = new EventEmitter<FormData>();

  submit() {
    console.log(this.form.getRawValue());
    if (!this.form.invalid) {
      const formData = new FormData();
      formData.append('image', this.image);
      console.log(Object.keys(this.form.controls));
      Object.keys(this.form.controls).forEach((key) => {
        if (key === 'category') {
          formData.append(key, this.form.controls.category.value.id!);
          return;
        }
        formData.append(key, this.form.get(key)?.value);
      });
      this.productSubmit.emit(formData);
    }
  }

  onChangeImage(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files![0];
    if (file) {
      this.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSubject.next(reader.result!);
      };
      reader.readAsDataURL(file);
    }
  }
}

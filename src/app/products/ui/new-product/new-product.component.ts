import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { CardModule } from 'primeng/card';
import { ProductFormComponent } from 'src/app/shared/ui/product-form/product-form.component';
import { NewProductStore } from './new-product.store';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, CardModule, ProductFormComponent],
  template: `
    <div class="p-4">
      <p-card header="Add new product">
        <app-product-form
          (productSubmit)="productSubmit($event)"
        ></app-product-form>
      </p-card>
    </div>
  `,
  providers: [provideComponentStore(NewProductStore)],
})
export default class NewProductComponent {
  private readonly store = inject(NewProductStore);

  productSubmit(product: FormData) {
    this.store.createProductEffect(product);
  }
}

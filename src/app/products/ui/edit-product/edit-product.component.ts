import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProductFormComponent } from 'src/app/shared/ui/product-form/product-form.component';
import { ActivatedRoute, Params } from '@angular/router';
import { EditProductStore } from './edit-product.store';
import { provideComponentStore } from '@ngrx/component-store';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, CardModule, ProductFormComponent],
  template: `
    <div class="p-4">
      <p-card header="Edit product">
        <app-product-form
          (productSubmit)="editProduct($event)"
          [product]="(this.store.product$ | async)!"
        ></app-product-form>
      </p-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(EditProductStore)],
})
export default class EditProductComponent {
  readonly store = inject(EditProductStore);

  editProduct(product: FormData) {
    this.store.updateProductEffect({ product });
  }
}

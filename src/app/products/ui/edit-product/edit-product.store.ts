import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { exhaustMap, pipe, switchMap } from 'rxjs';
import { Category } from 'src/app/shared/data-access/models/category';
import { Product } from 'src/app/shared/data-access/models/product';
import { ProductsService } from 'src/app/shared/data-access/services/products.service';

const initState: Product = {
  name: '',
  brand: '',
  price: '',
  image: '',
  category: {} as Category,
  stock: 0,
  isFeatured: false,
  description: '',
  richDescription: '',
};

@Injectable()
export class EditProductStore
  extends ComponentStore<{ product: Product }>
  implements OnStoreInit
{
  ngrxOnStoreInit() {
    this.setState({ product: initState });
  }

  private readonly router = inject(Router);

  readonly product$ = this.select((s) => s.product, { debounce: true });

  private readonly productsClient = inject(ProductsService);

  readonly getProductEffect = this.effect<string>(
    pipe(
      switchMap((id) =>
        this.productsClient.getProductById(id).pipe(
          tapResponse(
            (response) => {
              console.log(response);
              this.patchState({
                product: response.data.doc,
              });
            },
            (err) => console.error(err)
          )
        )
      )
    )
  );

  readonly updateProductEffect = this.effect<{ id: string; product: FormData }>(
    pipe(
      exhaustMap(({ id, product }) =>
        this.productsClient.editProduct(id, product).pipe(
          tapResponse(
            (response) => {
              console.log(response);
              this.router.navigate(['/products']);
            },
            (err) => console.error(err)
          )
        )
      )
    )
  );
}

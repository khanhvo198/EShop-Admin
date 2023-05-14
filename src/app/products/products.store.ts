import { Injectable, inject } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { Product } from '../shared/data-access/models/product';
import { exhaustMap, pipe, switchMap } from 'rxjs';
import { ProductsService } from '../shared/data-access/services/products.service';

@Injectable()
export class ProductsStore
  extends ComponentStore<{ products: Product[] }>
  implements OnStoreInit, OnStateInit
{
  ngrxOnStoreInit() {
    this.setState({ products: [] });
  }

  readonly products$ = this.select((s) => s.products, { debounce: true });

  ngrxOnStateInit() {
    this.getAllProductsEffect();
  }

  private readonly productsClient = inject(ProductsService);

  private readonly getAllProductsEffect = this.effect<void>(
    pipe(
      switchMap(() =>
        this.productsClient.getProducts().pipe(
          tapResponse(
            (response) =>
              this.patchState({
                products: response.data.products.map((product) => {
                  return {
                    ...product,
                    image: 'http://localhost:8080/img/product/' + product.image,
                  };
                }),
              }),
            (err) => console.error(err)
          )
        )
      )
    )
  );

  readonly deleteProductEffect = this.effect<string>(
    pipe(
      exhaustMap((id: string) =>
        this.productsClient.deleteProduct(id).pipe(
          tapResponse(
            (response) => this.patchState({ products: response.data.products }),
            (err) => console.error(err)
          )
        )
      )
    )
  );
}

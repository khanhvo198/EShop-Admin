import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ComponentStore,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { exhaustMap, pipe } from 'rxjs';
import { ProductsService } from 'src/app/shared/data-access/services/products.service';

@Injectable()
export class NewProductStore extends ComponentStore<{}> implements OnStoreInit {
  ngrxOnStoreInit() {
    this.setState({});
  }

  private readonly productsClient = inject(ProductsService);
  private readonly router = inject(Router);

  readonly createProductEffect = this.effect<FormData>(
    pipe(
      exhaustMap((product: FormData) =>
        this.productsClient.createNewProduct(product).pipe(
          tapResponse(
            (res) => this.router.navigate(['products']),
            (err) => console.error(err)
          )
        )
      )
    )
  );
}

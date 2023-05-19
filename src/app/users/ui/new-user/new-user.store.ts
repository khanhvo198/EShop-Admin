import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ComponentStore,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { exhaustMap, pipe } from 'rxjs';
import { User } from 'src/app/shared/data-access/models/user';
import { UsersService } from 'src/app/shared/data-access/services/users.service';

@Injectable()
export class NewUserStore extends ComponentStore<{}> implements OnStoreInit {
  ngrxOnStoreInit() {
    this.setState({});
  }

  private readonly usersClient = inject(UsersService);
  private router = inject(Router);

  createNewUserEffect = this.effect<User>(
    pipe(
      exhaustMap((user) =>
        this.usersClient.createNewUser(user).pipe(
          tapResponse(
            (res) => {
              this.router.navigate(['form']);
            },
            (err) => console.error(err)
          )
        )
      )
    )
  );
}

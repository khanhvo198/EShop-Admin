import { Component, Injectable, inject } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { User } from '../shared/data-access/models/user';
import { pipe, switchMap } from 'rxjs';
import { UsersService } from '../shared/data-access/services/users.service';

@Injectable()
export class UserStore
  extends ComponentStore<{ users: User[] }>
  implements OnStoreInit, OnStateInit
{
  ngrxOnStoreInit() {
    this.setState({ users: [] });
  }

  ngrxOnStateInit() {
    this.getUsersEffect();
  }

  private readonly usersClient = inject(UsersService);

  readonly users$ = this.select((s) => s.users, { debounce: true });

  readonly getUsersEffect = this.effect<void>(
    pipe(
      switchMap(() =>
        this.usersClient.getUsers().pipe(
          tapResponse(
            (res) => {
              this.patchState({
                users: res.data.users,
              });
            },
            (err) => console.error(err)
          )
        )
      )
    )
  );
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseUserApi, User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseURL = 'http://localhost:8080/api/v1/users';

  createNewUser(user: User) {
    return this.httpClient.post(this.baseURL, user);
  }

  getUsers(): Observable<ResponseUserApi> {
    return this.httpClient.get<ResponseUserApi>(this.baseURL);
  }

  deleteUser(id: string): Observable<ResponseUserApi> {
    return this.httpClient.delete<ResponseUserApi>(`${this.baseURL}/${id}`);
  }

  getUserById(id: string): Observable<ResponseUserApi> {
    return this.httpClient.get<ResponseUserApi>(`${this.baseURL}/${id}`);
  }

  editUser(id: string, user: User): Observable<ResponseUserApi> {
    return this.httpClient.patch<ResponseUserApi>(
      `${this.baseURL}/${id}`,
      user
    );
  }
}

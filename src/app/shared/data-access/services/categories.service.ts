import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, ResponseCategoryApi } from '../models/category';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseURL = 'http://localhost:8080/api/v1/categories';

  createNewCategory(category: Category) {
    return this.httpClient.post(this.baseURL, category);
  }

  getCategories(): Observable<ResponseCategoryApi> {
    return this.httpClient.get<ResponseCategoryApi>(this.baseURL);
  }

  deleteCategory(id: string): Observable<ResponseCategoryApi> {
    return this.httpClient.delete<ResponseCategoryApi>(`${this.baseURL}/${id}`);
  }

  getCategoryById(id: string): Observable<ResponseCategoryApi> {
    return this.httpClient.get<ResponseCategoryApi>(`${this.baseURL}/${id}`);
  }

  editCategory(
    id: string,
    category: Category
  ): Observable<ResponseCategoryApi> {
    return this.httpClient.patch<ResponseCategoryApi>(
      `${this.baseURL}/${id}`,
      category
    );
  }
}

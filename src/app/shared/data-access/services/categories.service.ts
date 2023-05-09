import { inject, Injectable } from '@angular/core';
import { Category, NewCategory } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseURL = 'http://localhost:8000/api/v1/categories';

  createNewCategory(category: NewCategory) {
    return this.httpClient.post(this.baseURL, category);
  }

  getCategories(): any {
    return this.httpClient.get(this.baseURL);
  }

  deleteCategory(id: string) {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}

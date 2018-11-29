import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


import { Category } from './category';
import { AppConfig } from '../app-config';
import { MessageService } from '../message.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private messageService: MessageService, private router: Router) { }
  /** GET heroes from the server */
  getCategories(): Observable<Category[]> {
    // TODO: send the message _after_ fetching the heroes
    // this.messageService.showMessage('HeroService: fetched heroes');
    return this.http.get<Category[]>(AppConfig.API_ENDPOINT + 'categories')
  }

  storeCategory(category: Category): Observable<Category> {
    // this.messageService.showMessage('New category added successfully.')
    return this.http.post<Category>(AppConfig.API_ENDPOINT + 'categories', category)
      .pipe(
        tap(_ => this.router.navigate(['categories'])),
        tap(_ => this.messageService.showMessage('New category added successfully.')),
        catchError(this.handleError<Category>('store category}'))
      );
  }

  deleteCategory(category:Category | number): Observable<Category> {
    const id = typeof category === 'number' ? category : category.id;
    return this.http.delete<Category>(AppConfig.API_ENDPOINT + 'categories/' + id)
    .pipe(
      tap(_ => this.messageService.showMessage('Category deleted successfully.')),
      catchError(this.handleError<Category>('delete category'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      if (error.status == 422) {
        this.messageService.showErrors(error.error);
      } else {
        alert('Something went wrong');
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }




}

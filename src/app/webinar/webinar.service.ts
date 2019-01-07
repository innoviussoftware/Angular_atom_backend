import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


import { Webinar } from './webinar';
import { User } from '../user/user';
import { AppConfig } from '../app-config';
import { MessageService } from '../message.service';


@Injectable({
  providedIn: 'root'
})
export class WebinarService {

  constructor(private http: HttpClient, private messageService: MessageService, private router: Router) { }

  getWebinars(): Observable<Webinar[]> {
    return this.http.get<Webinar[]>(AppConfig.API_ENDPOINT + 'webinars')
  }

  getInstructors(): Observable<User[]> {
    return this.http.get<User[]>(AppConfig.API_ENDPOINT + 'webinars/get/instructors');
  }

  storeWebinar(webinar: Webinar): Observable<Webinar> {
    return this.http.post<Webinar>(AppConfig.API_ENDPOINT + 'webinars', webinar)
      .pipe(
        tap(_ => this.router.navigate(['webinars'])),
        tap(_ => this.messageService.showMessage('New webinar added successfully.')),
        catchError(this.handleError<Webinar>('store webinar}'))
      );
  }

  getWebinar(id: number): Observable<Webinar> {
    const url = AppConfig.API_ENDPOINT + 'webinars/' + id;
    return this.http.get<Webinar>(url)
      .pipe(
        tap(_ => console.log('fetched single webinar')),
        catchError(this.handleError<Webinar>('getWebinar id=${id}'))
      );
  }

  updateWebinar(webinar: Webinar, id): Observable<Webinar> {
    return this.http.put<Webinar>(AppConfig.API_ENDPOINT + 'webinars/' + id, webinar)
      .pipe(
        tap(_ => this.messageService.showMessage('Webinar updated successfully.')),
        tap(_ => this.router.navigate(['webinars'])),
        catchError(this.handleError<Webinar>('update WEBINAR'))
      )
  }

  deleteWebinar(webinar: Webinar): Observable<Webinar> {
    const id = typeof webinar === 'number' ? webinar : webinar.id;
    return this.http.delete<Webinar>(AppConfig.API_ENDPOINT + 'webinars/' + id)
      .pipe(
        tap(_ => this.messageService.showMessage('Webinar deleted successfully.')),
        catchError(this.handleError<Webinar>('delete webinar'))
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

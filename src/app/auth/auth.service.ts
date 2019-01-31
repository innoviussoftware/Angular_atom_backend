import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { AppConfig } from '../app-config';
import { MessageService } from '../message.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private messageService: MessageService, private router: Router) { }

  isLoggedIn(): boolean { //Check if token is there
    if (localStorage.getItem('auth_token')) {
      return true;
    } else {
      return false;
    }
  }

  login(data): Observable<any> { //Login API admin
    return this.http.post<any>(AppConfig.API_ENDPOINT + 'login_admin', data)
      .pipe(
        tap(_ => console.log('login successfull')),
        // catchError(this.handleError<any>('login',err: HttpResponse))
        catchError(error => this.handleError(error))

      );
  }

  logout(){ //Logout:: clear local storage and reload after it
     localStorage.removeItem("auth_token"); //Remove token
     localStorage.removeItem("auth_user"); //Remove user
     location.reload();
   }
  //
  //
  //  getCourse(id: number): Observable<Course> {
  //    const url = AppConfig.API_ENDPOINT + 'courses/' + id;
  //    return this.http.get<Course>(url)
  //      .pipe(
  //        tap(_ => console.log('fetched single course')),
  //        catchError(this.handleError<Course>('getCourse id=${id}'))
  //      );
  //  }
  //
  //  storeCourse(course: Course): Observable<Course> {
  //    return this.http.post<Course>(AppConfig.API_ENDPOINT + 'courses', course)
  //      .pipe(
  //        tap(_ => this.messageService.showMessage('New Course added successfully.')),
  //        // tap(_ => this.router.navigate(['courses'])),
  //        catchError(this.handleError<Course>('store COURSE}'))
  //      )
  //  }
  //
  //  updateCourse(course: Course, id): Observable<Course>{
  //    return this.http.put<Course>(AppConfig.API_ENDPOINT + 'courses/' + id, course)
  //    .pipe(
  //      tap(_ => this.messageService.showMessage('Course updated successfully.')),
  //      // tap(_ => this.router.navigate(['courses'])),
  //      catchError(this.handleError<Course>('update COURSE'))
  //    )
  //  }
  //
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError(error) {
    this.messageService.showSingleError(error.error.error);
    return error;
  };
}

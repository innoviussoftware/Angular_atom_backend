import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


import { User } from './user';
import { AppConfig } from '../app-config';
import { MessageService } from '../message.service';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') })
  };

  constructor(private http: HttpClient, private messageService: MessageService, private authService: AuthService, private router: Router) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(AppConfig.API_ENDPOINT + 'users',this.httpOptions)
    .pipe(
      catchError(this.handleError<User[]>('get users'))
    )
  }

  getSingleUser(id:number): Observable<User> {
    return this.http.get<User>(AppConfig.API_ENDPOINT + 'users/'+ id)
    .pipe(
      catchError(this.handleError<User>('get users'))
    )
  }

  delete(user:User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    return this.http.delete<User>(AppConfig.API_ENDPOINT + 'users/' + id, this.httpOptions)
    .pipe(
      tap(_ => this.messageService.showMessage('User deleted successfully.')),
      catchError(this.handleError<User>('delete user'))
    );
  }

  update(user: User, id): Observable<User>{
    return this.http.patch<User>(AppConfig.API_ENDPOINT + 'users/' + id, user, this.httpOptions)
    .pipe(
      tap(_ => this.messageService.showMessage('User updated successfully.')),
      // tap(_ => this.router.navigate(['courses'])),
      catchError(this.handleError<User>('update Chapter'))
    )
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
      } else if(error.status == 401){
        this.authService.logout();
      } else if(error.status == 404){

      } else {
        alert('Something went wrong');
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }




}

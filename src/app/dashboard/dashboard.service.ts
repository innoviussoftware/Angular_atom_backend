
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { AppConfig } from '../app-config';
import { MessageService } from '../message.service';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') })
  };

  constructor(private http: HttpClient, private messageService: MessageService,  private authService: AuthService, private router: Router) { }

  // /** GET heroes from the server */
  // getCourses(): Observable<Course[]> {
  //   return this.http.get<Course[]>(AppConfig.API_ENDPOINT + 'courses')
  // }
  //
  //
  getDashboard(): Observable<any> {
    return this.http.get<any>(AppConfig.API_ENDPOINT + 'dashboard', this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched dashboard')),
        catchError(this.handleError<any>('getDashboard'))
      );
  }

  //
  // storeModules(cmodule): Observable<CModule> {
  //   return this.http.post<CModule>(AppConfig.API_ENDPOINT + 'courses/store/modules', cmodule)
  //     .pipe(
  //       tap(_ => this.messageService.showMessage('Modules(s) added successfully.')),
  //       catchError(this.handleError<CModule>('store Modules'))
  //     )
  // }

  // uploadFiles(files, id): Observable<any>{
  //   return this.http.post<any>(AppConfig.API_ENDPOINT + 'courses/store/modules_files/'+id, files)
  //     .pipe(
  //       tap(_ => this.messageService.showMessage('Modules(s) added successfully.')),
  //       catchError(this.handleError<any>('store Modules'))
  //     );
  // }
  //
  // updateModule(cmodule: CModule): Observable<CModule>{
  //   return this.http.patch<CModule>(AppConfig.API_ENDPOINT + 'courses/update/modules/' + cmodule.id, cmodule)
  //   .pipe(
  //     tap(_ => this.messageService.showMessage('Module updated successfully.')),
  //     // tap(_ => this.router.navigate(['courses'])),
  //     catchError(this.handleError<CModule>('update Moodule'))
  //   )
  // }

  // deleteModule(module: CModule | number): Observable<CModule> {
  //   const id = typeof module === 'number' ? module : module.id;
  //   return this.http.delete<CModule>(AppConfig.API_ENDPOINT + 'courses/delete/modules/' + id)
  //   .pipe(
  //     // tap(_ => this.messageService.showMessage('Material deleted successfully.')),
  //     catchError(this.handleError<CModule>('delete Material;'))
  //   );
  // }

  // deleteModuleFile(id): Observable<any> {
  //   return this.http.delete<any>(AppConfig.API_ENDPOINT + 'courses/delete/modules_file/' + id)
  //   .pipe(
  //     // tap(_ => this.messageService.showMessage('Material deleted successfully.')),
  //     catchError(this.handleError<any>('delete Material;'))
  //   );
  // }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      window.scrollTo(0, 0);
      console.error(error); // log to console instead
      if (error.status == 422) {
        this.messageService.showErrors(error.error);
      } else if(error.status == 403){
        this.router.navigate(['page-not-permitted'])
      }if(error.status == 401){
        this.authService.logout();
      } else {
        alert('Something went wrong');
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  };
}

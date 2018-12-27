import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Section } from './section';
import { AppConfig } from '../app-config';
import { MessageService } from '../message.service';


@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient, private messageService: MessageService, private router: Router) { }

  // /** GET heroes from the server */
  // getCourses(): Observable<Course[]> {
  //   return this.http.get<Course[]>(AppConfig.API_ENDPOINT + 'courses')
  // }
  //
  //
  getSection(id: number): Observable<Section> {
    return this.http.get<Section>(AppConfig.API_ENDPOINT + 'sections/' + id)
      .pipe(
        tap(_ => console.log('fetched single section')),
        catchError(this.handleError<Section>('getModule'))
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


  updateSection(section: Section): Observable<Section>{
    return this.http.patch<Section>(AppConfig.API_ENDPOINT + 'sections/' + section.id, section)
    .pipe(
      tap(_ => this.messageService.showMessage('Module updated successfully.')),
      // tap(_ => this.router.navigate(['courses'])),
      catchError(this.handleError<Section>('update Moodule'))
    )
  }

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
      console.error(error); // log to console instead
      window.scrollTo(0, 0);
      if (error.status == 422) {
        this.messageService.showErrors(error.error);
      } else {
        alert('Something went wrong');
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  };
}

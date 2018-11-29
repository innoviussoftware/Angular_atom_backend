import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Material } from './material';
import { AppConfig } from '../app-config';
import { MessageService } from '../message.service';


@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient, private messageService: MessageService, private router: Router) { }

  // /** GET heroes from the server */
  // getCourses(): Observable<Course[]> {
  //   return this.http.get<Course[]>(AppConfig.API_ENDPOINT + 'courses')
  // }
  //
  //
  // getCourse(id: number): Observable<Course> {
  //   const url = AppConfig.API_ENDPOINT + 'courses/' + id;
  //   return this.http.get<Course>(url)
  //     .pipe(
  //       tap(_ => console.log('fetched single course')),
  //       catchError(this.handleError<Course>('getCourse id=${id}'))
  //     );
  // }
  //
  storeMaterials(material): Observable<Material[]> {
    return this.http.post<Material[]>(AppConfig.API_ENDPOINT + 'courses/store/materials', material)
      .pipe(
        tap(_ => this.messageService.showMessage('Materials added successfully.')),
        catchError(this.handleError<Material[]>('store Materials'))
      )
  }
  //
  // updateCourse(course: Course, id): Observable<Course>{
  //   return this.http.put<Course>(AppConfig.API_ENDPOINT + 'courses/' + id, course)
  //   .pipe(
  //     tap(_ => this.messageService.showMessage('Course updated successfully.')),
  //     // tap(_ => this.router.navigate(['courses'])),
  //     catchError(this.handleError<Course>('update COURSE'))
  //   )
  // }
  deleteMaterial(material: Material | number): Observable<Material> {
    const id = typeof material === 'number' ? material : material.id;
    return this.http.delete<Material>(AppConfig.API_ENDPOINT + 'courses/delete/materials/' + id)
    .pipe(
      // tap(_ => this.messageService.showMessage('Material deleted successfully.')),
      catchError(this.handleError<Material>('delete Material;'))
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
  };
}

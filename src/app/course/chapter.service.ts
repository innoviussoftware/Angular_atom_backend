import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Chapter } from './chapter';
import { ChapterContent } from './chapter-content';
import { AppConfig } from '../app-config';
import { MessageService } from '../message.service';


@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient, private messageService: MessageService, private router: Router) { }

  /** GET heroes from the server */
  // getCourses(): Observable<Course[]> {
  //   return this.http.get<Course[]>(AppConfig.API_ENDPOINT + 'courses')
  // }


  // getCourse(id: number): Observable<Course> {
  //   const url = AppConfig.API_ENDPOINT + 'courses/' + id;
  //   return this.http.get<Course>(url)
  //     .pipe(
  //       tap(_ => console.log('fetched single course')),
  //       catchError(this.handleError<Course>('getCourse id=${id}'))
  //     );
  // }

  store(chapter: Chapter): Observable<Chapter> {
    return this.http.post<Chapter>(AppConfig.API_ENDPOINT + 'chapters', chapter)
      .pipe(
        tap(_ => this.messageService.showMessage('New Course added successfully.')),
        catchError(this.handleError<Chapter>('store Chapter}'))
      )
  }

  storeContent(chapter_content: ChapterContent): Observable<ChapterContent> {
    return this.http.post<ChapterContent>(AppConfig.API_ENDPOINT + 'chapter_contents', chapter_content)
      .pipe(
        tap(_ => this.messageService.showMessage('New Course Content added successfully.')),
        catchError(this.handleError<ChapterContent>('store Chapter Content}'))
      )
  }

  update(chapter: Chapter, id): Observable<Chapter>{
    return this.http.put<Chapter>(AppConfig.API_ENDPOINT + 'chapters/' + id, chapter)
    .pipe(
      tap(_ => this.messageService.showMessage('Chapter updated successfully.')),
      // tap(_ => this.router.navigate(['courses'])),
      catchError(this.handleError<Chapter>('update Chapter'))
    )
  }

  updateContent(content: ChapterContent, id): Observable<ChapterContent>{
    return this.http.put<ChapterContent>(AppConfig.API_ENDPOINT + 'chapter_contents/' + id, content)
    .pipe(
      tap(_ => this.messageService.showMessage('Chapter content updated successfully.')),
      // tap(_ => this.router.navigate(['courses'])),
      catchError(this.handleError<ChapterContent>('update Chapter'))
    )
  }

  delete(chapter: Chapter | number): Observable<Chapter> {
    const id = typeof chapter === 'number' ? chapter : chapter.id;
    return this.http.delete<Chapter>(AppConfig.API_ENDPOINT + 'chapters/' + id)
    .pipe(
      // tap(_ => this.messageService.showMessage('Material deleted successfully.')),
      catchError(this.handleError<Chapter>('delete Chapter;'))
    );
  }
  deleteContent(content: ChapterContent | number): Observable<ChapterContent> {
    const id = typeof content === 'number' ? content : content.id;
    return this.http.delete<ChapterContent>(AppConfig.API_ENDPOINT + 'chapter_contents/' + id)
    .pipe(
      // tap(_ => this.messageService.showMessage('Material deleted successfully.')),
      catchError(this.handleError<ChapterContent>('delete Chapter;'))
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
      window.scrollTo(0, 0);
      // document.body.scrollTop = 0; // For Safari
      // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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

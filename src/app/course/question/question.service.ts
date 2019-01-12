import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Question } from './question';
import { AppConfig } from '../../app-config';
import { MessageService } from '../../message.service';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') })
  };
  constructor(private http: HttpClient, private messageService: MessageService, private router: Router) { }

  /** GET heroes from the server */
  // getCourses(): Observable<Course[]> {
  //   return this.http.get<Course[]>(AppConfig.API_ENDPOINT + 'courses')
  // }


  // getChapter(id: number): Observable<Chapter> {
  //   const url = AppConfig.API_ENDPOINT + 'chapters/' + id;
  //   return this.http.get<Chapter>(url)
  //     .pipe(
  //       tap(_ => console.log('fetched single course')),
  //       catchError(this.handleError<Chapter>('getCourse id=${id}'))
  //     );
  // }

  store(question: Question): Observable<Question> {
    return this.http.post<Question>(AppConfig.API_ENDPOINT + 'questions', question, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.showMessage('Question updated successfully.')),
        catchError(this.handleError<Question>('store Chapter}'))
      )
  }

  // storeContent(chapter_content: ChapterContent): Observable<ChapterContent> {
  //   return this.http.post<ChapterContent>(AppConfig.API_ENDPOINT + 'chapter_contents', chapter_content)
  //     .pipe(
  //       tap(_ => this.messageService.showMessage('New Course Content added successfully.')),
  //       catchError(this.handleError<ChapterContent>('store Chapter Content}'))
  //     )
  // }
  //
  // file_upload(fileToUpload): Observable<any> {
  //   return this.http.post<any>(AppConfig.API_ENDPOINT + 'chapters/image/upload', fileToUpload)
  //     .pipe(
  //       catchError(this.handleError<any>('File uploaded'))
  //     )
  // }

  // update(question: Question, id): Observable<Question>{
  //   return this.http.patch<Question>(AppConfig.API_ENDPOINT + 'questions/' + id, question, this.httpOptions)
  //   .pipe(
  //     tap(_ => this.messageService.showMessage('Question updated successfully.')),
  //     // tap(_ => this.router.navigate(['courses'])),
  //     catchError(this.handleError<Question>('update Chapter'))
  //   )
  // }

  // updateContent(content: ChapterContent, id): Observable<ChapterContent>{
  //   return this.http.put<ChapterContent>(AppConfig.API_ENDPOINT + 'chapter_contents/' + id, content)
  //   .pipe(
  //     tap(_ => this.messageService.showMessage('Chapter content updated successfully.')),
  //     // tap(_ => this.router.navigate(['courses'])),
  //     catchError(this.handleError<ChapterContent>('update Chapter'))
  //   )
  // }
  //
  delete(question: Question | number): Observable<Question> {
    const id = typeof question === 'number' ? question : question.id;
    return this.http.delete<Question>(AppConfig.API_ENDPOINT + 'questions/' + id, this.httpOptions)
    .pipe(
      // tap(_ => this.messageService.showMessage('Material deleted successfully.')),
      catchError(this.handleError<Question>('delete Chapter;'))
    );
  }
  // deleteContent(content: ChapterContent | number): Observable<ChapterContent> {
  //   const id = typeof content === 'number' ? content : content.id;
  //   return this.http.delete<ChapterContent>(AppConfig.API_ENDPOINT + 'chapter_contents/' + id)
  //   .pipe(
  //     // tap(_ => this.messageService.showMessage('Material deleted successfully.')),
  //     catchError(this.handleError<ChapterContent>('delete Chapter;'))
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

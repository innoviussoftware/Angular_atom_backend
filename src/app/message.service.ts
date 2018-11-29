import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  message: string = '';
  singleError: string = '';
  errors: string[] = [];

  showMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 2000);
  }

  showErrors(errors: string[]) {
    this.errors = errors;
    setTimeout(() => {
      this.errors = [];
    }, 3000);
  }
  
  showSingleError(singleError: string) {
    this.singleError = singleError;
    setTimeout(() => {
      this.singleError = '';
    }, 3000);
  }

}

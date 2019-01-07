import { Component, OnInit } from '@angular/core';

import{ AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-page-not-permitted',
  templateUrl: './page-not-permitted.component.html',
  styleUrls: ['./page-not-permitted.component.css']
})
export class PageNotPermittedComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout(){
     this.authService.logout();
   }

}

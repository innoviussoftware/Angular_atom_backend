import { Component, OnInit } from '@angular/core';

import{ AuthService } from '../../auth/auth.service';



@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  auth_user = JSON.parse(localStorage.getItem("auth_user"));

  constructor(private authService: AuthService) { }

  ngOnInit() {
    
  }

  logout(){
      this.authService.logout();
  }

}

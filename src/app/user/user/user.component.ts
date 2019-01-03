import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  id:number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getSingleUser();
  }

  getSingleUser():void {
    this.userService.getSingleUser(this.id)
    .subscribe(user => this.user = user);
  }



}

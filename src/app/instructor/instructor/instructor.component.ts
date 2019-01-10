import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../user/user.service';
import { User } from '../../user/user';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {
  user: User;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getSingleUser();
  }

  getSingleUser(): void {
    this.userService.getSingleUser(this.id)
      .subscribe(user => this.user = user);
  }



}

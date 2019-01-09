import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user';
declare var $: any;


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  // styleUrls: ['./categories.component.css']
})
export class UserlistComponent implements OnInit {
  users: User[];
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserlist();
  }

  getUserlist(): void {
    this.userService.getAll()
      .subscribe(users => this.users = users);
  }

  delete(user: User) {
    if (confirm('are you sure you want to delete this ?')) {
      this.userService.delete(user).subscribe();
      this.users = this.users.filter(u => u !== user);
    }
  }

  doApprove(event: any, user:User): void {
    user.is_approved = event.target.value;
    this.updateUser(user);
  }

  updateUser(user: User): void {
    this.userService.update(user, user.id).subscribe();
  }

}

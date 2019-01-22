import { Component,ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import{ AuthService } from '../auth/auth.service';
import{ UserService } from '../user/user.service';
import{ User } from '../user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
profileForm: FormGroup;

	auth_user = JSON.parse(localStorage.getItem("auth_user"));
	id: number;
  image_upload = new FormData();
  @ViewChild("fileInput") fileInput;

  constructor(private authService: AuthService,private formBuilder: FormBuilder,private userService: UserService) {  }

  ngOnInit() {
	  this.profileForm = this.formBuilder.group({	      
	      name: [this.auth_user.name, Validators.required],
	      last_name: [this.auth_user.last_name, Validators.required],
	      short_description: [this.auth_user.short_description, Validators.required],
	      biography: [this.auth_user.biography, Validators.required],
	      image: ['', Validators.required],
	      facebook: [this.auth_user.facebook, Validators.required],
	      twitter: [this.auth_user.twitter, Validators.required],
	      google: [this.auth_user.google, Validators.required],
	      pinterest: [this.auth_user.pinterest, Validators.required],
	      skype: [this.auth_user.skype, Validators.required]	      
	    });
	    this.id = this.auth_user.id;
  }

  onSubmit(){
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      let input = new FormData();
      input.append("image", fileToUpload);
      this.userService.file_upload(input)
        .subscribe(file_upload => {
          this.profileForm.controls['image'].setValue(file_upload.path);
          this.userService.update(this.profileForm.value, this.id)
            .subscribe(user => {
            this.auth_user = user;
        	let auth_user_data = JSON.parse(localStorage.getItem("auth_user"));
			auth_user_data = user;
        	localStorage.setItem("auth_user", JSON.stringify(auth_user_data));
            });

        });
    } else {
      this.profileForm.controls['image'].setValue(null);
      this.userService.update(this.profileForm.value, this.id)
        .subscribe(user => {
            this.auth_user = user;
            let auth_user_data = JSON.parse(localStorage.getItem("auth_user"));
			auth_user_data = user;
        	localStorage.setItem("auth_user", JSON.stringify(auth_user_data));
            });
    }
  }
	
	onFileChange(event) {
	    this.image_upload.delete('image');
	    if (event.target.files.length > 0) {
	      let files = event.target.files;
	      for (var i = 0; i < files.length; i++) {
	        this.image_upload.append("image", files[i]);
	      }
	    }
	  }
}

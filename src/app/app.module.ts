import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';

import { CourseModule } from './course/course.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { LayoutModule } from './layout/layout.module';
import { UserModule } from './user/user.module';
import { CheckAuth } from './auth/check-auth.guard';
import { WebinarModule } from './webinar/webinar.module';
import { InstructorModule } from './instructor/instructor.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FormComponent,
    ProfileComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    CourseModule,
    CategoryModule,
    AuthModule,
    UserModule,
    InstructorModule,
    WebinarModule,
     ReactiveFormsModule,
    FormsModule,
  ],
  providers: [CheckAuth,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

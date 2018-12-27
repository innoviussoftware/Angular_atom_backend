import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';

import { CourseModule } from './course/course.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { LayoutModule } from './layout/layout.module';

import { CheckAuth } from './auth/check-auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    CourseModule,
    CategoryModule,
    AuthModule,
  ],
  providers: [CheckAuth,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

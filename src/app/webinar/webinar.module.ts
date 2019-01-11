import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AddWebinarComponent } from './add-webinar/add-webinar.component';
import { WebinarRoutingModule } from './webinar-routing.module';
import { WebinarsComponent } from './webinars/webinars.component';
import { EditWebinarComponent } from './edit-webinar/edit-webinar.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { WebinarDetailsComponent } from './webinar-details/webinar-details.component';


@NgModule({
  declarations: [AddWebinarComponent, WebinarsComponent, EditWebinarComponent, WebinarDetailsComponent],
  imports: [
    CommonModule,
    WebinarRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    NgMultiSelectDropDownModule.forRoot(),
    OwlDateTimeModule,
     OwlNativeDateTimeModule,
     BrowserAnimationsModule
  ]
})
export class WebinarModule { }

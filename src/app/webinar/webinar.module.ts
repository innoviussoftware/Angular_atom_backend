import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddWebinarComponent } from './add-webinar/add-webinar.component';
import { WebinarRoutingModule } from './webinar-routing.module';
import { WebinarsComponent } from './webinars/webinars.component';
import { EditWebinarComponent } from './edit-webinar/edit-webinar.component';


@NgModule({
  declarations: [AddWebinarComponent, WebinarsComponent, EditWebinarComponent],
  imports: [
    CommonModule,
    WebinarRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class WebinarModule { }

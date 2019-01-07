import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { MessageComponent } from './message/message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutComponent } from './layout.component';
import { PageNotPermittedComponent } from './page-not-permitted/page-not-permitted.component';


@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    TopbarComponent,
    LayoutComponent,
    MessageComponent,
    PageNotFoundComponent,
    PageNotPermittedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [MessageComponent],
})
export class LayoutModule { }

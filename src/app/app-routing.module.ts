import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { FormComponent } from './form/form.component';
import { LayoutComponent } from './layout/layout.component';
import { CheckAuth } from './auth/check-auth.guard';


const routes: Routes = [
  // App Admin routes goes here here
  {
    path: '',
    component: LayoutComponent,
    canActivate:[CheckAuth],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'form', component: FormComponent },
    ]
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
      this.router.errorHandler = (error: any) => {
          this.router.navigate(['/page-not-found']); // or redirect to default route
      }
    }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { ViewFormComponent } from './view-form/view-form.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'forms', component: HomepageComponent },
  { path: 'forms/create', component: CreateFormComponent },
  { path: 'forms/edit/:id', component: CreateFormComponent },
  { path: 'forms/:id/viewform', component: ViewFormComponent },
  // Wildcard route for additional segments
  {
    path: 'forms/create/:extraPath',
    redirectTo: 'forms/create',
    pathMatch: 'full',
  },
  {
    path: 'forms/edit/:formId/:extraPath',
    redirectTo: 'forms/edit/:formId',
    pathMatch: 'full',
  },

  { path: '**', redirectTo: '/forms' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

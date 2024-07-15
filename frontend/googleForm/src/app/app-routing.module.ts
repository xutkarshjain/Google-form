import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateFormComponent } from './create-form/create-form.component';

const routes: Routes = [
  {path:"", component:HomepageComponent},
  {path:'create', component:CreateFormComponent},
  {path:'form/:id', component:CreateFormComponent},
  {path:"**", component:HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

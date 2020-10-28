import { ContactComponent } from './components/contact/contact.component';
import { GuardAuthGuard } from './guard-auth.guard';
import { CinemaComponent } from './components/cinema/cinema.component';
import { AdminComponent } from './components/admin/admin.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:  "",component:CinemaComponent
  },

  {
    path:  "cinema",component:CinemaComponent
  },

  {
    path:  "admin",component:AdminComponent,canActivate:[GuardAuthGuard]
  },

  {
    path:  "contact",component: ContactComponent,canActivate:[GuardAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[GuardAuthGuard]
})
export class AppRoutingModule { }

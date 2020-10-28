import { CinemaService } from './services/cinema.service';
import { environment } from './../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VilleService } from './services/ville.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { ScrollComponent } from './components/scroll/scroll.component';
import { ListCinemaComponent } from './components/list-cinema/list-cinema.component';
import { ToStringPipe } from './to-string.pipe';
import { FormsModule, NgControl, ReactiveFormsModule  } from '@angular/forms';
import { ShowVideoComponent } from './components/show-video/show-video.component';
import {AngularFireModule}  from 'angularfire2';
import {AngularFirestoreModule}  from 'angularfire2/firestore';
import {AngularFireAuthModule}  from 'angularfire2/auth';
import { AdminComponent } from './components/admin/admin.component';
import { CinemaComponent } from './components/cinema/cinema.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { DatePipe } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ScrollComponent,
    ListCinemaComponent,
    ToStringPipe,
    ShowVideoComponent,
    AdminComponent,
    CinemaComponent,
    ModalFormComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    



  ],
  providers: [VilleService,CinemaService,DatePipe],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]

})
export class AppModule { }

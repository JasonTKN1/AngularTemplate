import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';



import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CusFormComponent } from './components/cus-form/cus-form.component';


var firebaseConfig = {
  apiKey: "AIzaSyBwXL8N5IXD0FBBKu1sJHtTzEvPzUO4xgc",
  authDomain: "react-template-521ee.firebaseapp.com",
  databaseURL: "https://react-template-521ee.firebaseio.com",
  projectId: "react-template-521ee",
  storageBucket: "react-template-521ee.appspot.com",
  messagingSenderId: "644150921085",
  appId: "1:644150921085:web:db19fbd0e2f560e5e3ae14",
  measurementId: "G-Y88XXJFD9Q"
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    CusFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {return sessionStorage.token;},
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

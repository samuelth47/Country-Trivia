import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';


// Fitsum's web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: 'cs336-finalproject-1fd79',
  appId: '1:943195271889:web:ca9266957800b526038bf0',
  storageBucket: 'cs336-finalproject-1fd79.appspot.com',
  apiKey: 'AIzaSyALf42FcdUiLWHJ1c_eKGneoRH4fJPAuaw',
  authDomain: 'cs336-finalproject-1fd79.firebaseapp.com',
  messagingSenderId: '943195271889',
  measurementId: 'G-QWN3LVTWC5',
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ColorPickerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
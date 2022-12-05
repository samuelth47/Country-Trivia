import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hmwk10-chatapp';
  message$ : FirestoreRec[] = [];

  name : string = localStorage.getItem("name")!; 
  color : string  = localStorage.getItem("color")!;
  message : string = "";

  constructor(private firestore: AngularFirestore) {
    this.getMessages().subscribe(result => this.message$ = result);
  }

  getMessages() : Observable<FirestoreRec[]>{
    return this.firestore.collection<FirestoreRec>('messages', ref => ref.orderBy('timestamp')).valueChanges()
  }

  sendMessage() : void {
    this.firestore.collection<FirestoreRec>('messages').add({
      message: this.name + ': ' + this.message,
      timestamp: new firebase.default.firestore.Timestamp(Date.now() / 1000, 0),
      color: this.color,
    });
    this.message = "";
  }

  saveName() { localStorage.setItem("name", this.name); }
  saveColor() { localStorage.setItem("color", this.color); }
}

export interface FirestoreRec {
  message: string
  timestamp: firebase.default.firestore.Timestamp
  color ? : string
}
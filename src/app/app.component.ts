import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';

export interface FirestoreRec {
  name: string
  searchQuery: string
  timestamp: firebase.default.firestore.Timestamp
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'countryTrivia';
  searchResult = "";
  countryData: any;

  name: string = localStorage.getItem("name")!;
  searchQuery: string = "";
  searchArray: FirestoreRec[] = [];


  constructor(private firestore: AngularFirestore, private api: ApiService) {
    this.getMessages().subscribe(result => this.searchArray = result);
  }

  getMessages(): Observable<FirestoreRec[]> {
    return this.firestore.collection<FirestoreRec>('searchQueries', ref => ref.orderBy('timestamp')).valueChanges()
  }

  sendQuery(): void {
    this.firestore.collection<FirestoreRec>('searchQueries').add({
      name: this.name,
      searchQuery: this.name + ': ' + this.searchQuery,
      timestamp: new firebase.default.firestore.Timestamp(Date.now() / 1000, 0),
    });
    this.searchQuery = "";
  }

  saveName() { localStorage.setItem("name", this.name); }

  getAPIData(searchQuery: string) {
    this.api.getCountries(this.searchQuery).subscribe((data) => {
      this.countryData = data;
    });
  }
}

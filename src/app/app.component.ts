import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

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


  constructor(private router: Router, private firestore: AngularFirestore, private api: ApiService) {
    this.getMessages().subscribe(result => this.searchArray = result);
  }

  // Retrieves stored recent searches (latest 20)
  getMessages(): Observable<FirestoreRec[]> {
    return this.firestore.collection<FirestoreRec>('searchQueries', ref => ref.orderBy('timestamp').limitToLast(20)).valueChanges()
  }

  // Function sendQuery concatenates the inputs along with the timestamp and stores the resulting string
  sendQuery(): void {
    this.firestore.collection<FirestoreRec>('searchQueries').add({
      name: this.name,
      searchQuery: this.name + ': ' + this.searchQuery,
      timestamp: new firebase.default.firestore.Timestamp(Date.now() / 1000, 0),
    });
    this.searchQuery = "";
  }

  // Stores the name of the user 
  saveName() { localStorage.setItem("name", this.name); }

  // Function getAPIData retrieves the country information and stores it
  getAPIData(searchQuery: string) {
    this.api.getCountries(this.searchQuery).subscribe((data) => {
      this.countryData = data;
    });
  }

  //Function hasRoute checks if a certain route is found in the url
  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
}

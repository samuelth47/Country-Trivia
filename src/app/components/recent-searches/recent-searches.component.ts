import { Component, OnInit, Input } from '@angular/core';
import { FirestoreRec } from 'src/app/app.component';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss']
})
export class RecentSearchesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() result = {} as FirestoreRec;

}

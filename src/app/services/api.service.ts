import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCountries(searchQuery: string) {
    return this.http.get('https://restcountries.com/v2/name/' + searchQuery);
  }

}

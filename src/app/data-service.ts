import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private getDipendentiUrl = "http://localhost:8080/api/dipendenti";

  constructor(private http: HttpClient) {}

  getTabellaData(): Observable<any[]> {
    return this.http.get<any[]>(this.getDipendentiUrl);
  }
}

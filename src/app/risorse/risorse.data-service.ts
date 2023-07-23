import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RisorseDataModel } from './risorse.data-model'; // Sostituisci con il tuo modello dati

@Injectable({
  providedIn: 'root'
})
export class RisorseDataService {
  private apiUrl = 'http://localhost:8080/api/dipendenti'; // Sostituisci con l'URL del tuo endpoint Spring Boot

  constructor(private http: HttpClient) { }

  getData(): Observable<RisorseDataModel[]> {
    return this.http.get<RisorseDataModel[]>(this.apiUrl);
  }
}

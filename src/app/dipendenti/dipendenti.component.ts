import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dipendente } from './dipendente';
import { Observable } from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { CdkTable } from '@angular/cdk/table';


@Component({
  selector: 'app-dipendenti',
  templateUrl: './dipendenti.component.html',
  styleUrls: ['./dipendenti.component.css']
})
export class DipendentiComponent {

  readonly ROOT_URL = "http://localhost:8080/api/dipendenti";

  dipendenti: MatTableDataSource<Dipendente> = new MatTableDataSource<Dipendente>();
  displayedColumnsDipendenti: string[] = ['matricola', 'nome', 'cognome', 'unitaOrganizzativa'];


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDipendenti();
  }

  getDipendenti() {
    this.http.get<Dipendente[]>(this.ROOT_URL).subscribe((data) => {
      this.dipendenti = new MatTableDataSource<Dipendente>(data);
    });
  }

}

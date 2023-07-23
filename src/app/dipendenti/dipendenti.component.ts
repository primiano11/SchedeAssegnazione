import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dipendenti',
  templateUrl: './dipendenti.component.html',
  styleUrls: ['./dipendenti.component.css']
})
export class DipendentiComponent implements OnInit {

  tabellaData: any[] = [];
  displayedColumns: string[] = ['matricola', 'nome', 'cognome', 'unita_organizzativa']; // Aggiungi le altre colonne a seconda della tua tabella
  dataSource: MatTableDataSource<any>;

  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource<any>(this.tabellaData);
  }

  ngOnInit(): void {
    this.caricaDatiTabella();
  }

  caricaDatiTabella(): void {
    this.dataService.getTabellaData().subscribe(
      (data) => {
        this.tabellaData = data;
        this.dataSource.data = this.tabellaData;
      },
      (error) => {
        console.error('Si è verificato un errore durante il recupero dei dati:', error);
      }
    );
  }
}

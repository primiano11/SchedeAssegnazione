import { Component, OnInit} from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Dipendente } from './dipendente';
import { Observable } from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { CdkTable } from '@angular/cdk/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dipendenti',
  templateUrl: './dipendenti.component.html',
  styleUrls: ['./dipendenti.component.css']
})
export class DipendentiComponent {

  readonly ROOT_URL = "http://localhost:8080/api/dipendenti";

  dipendenti: MatTableDataSource<Dipendente> = new MatTableDataSource<Dipendente>();
  displayedColumnsDipendenti: string[] = ['matricola', 'nome', 'cognome', 'unitaOrganizzativa'];


  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.getDipendenti();
  }

  getDipendenti() {
    this.http.get<Dipendente[]>(this.ROOT_URL).subscribe((data) => {
      this.dipendenti = new MatTableDataSource<Dipendente>(data);
    });
  }

  openDialogDipendenti() {
    const dialogRef = this.dialog.open(DialogContentDipendenti);

    dialogRef.afterClosed().subscribe(result => {
      this.getDipendenti();
    });

  }


}



@Component({
  selector: 'dialog-content-dipendenti',
  templateUrl: './dialog-content-dipendenti.html',
  styleUrls: ['./dialog-content-dipendenti.css'],
})
export class DialogContentDipendenti {



  private readonly SAVE_DIPENDENTE_URL = 'http://localhost:8080/api/savedipendente';


  hide = true;

  matricola: number;
  nome: string;
  cognome: string;
  unitaOrganizzativa: string;

  constructor(public dialogRef: MatDialogRef<DialogContentDipendenti>, private http: HttpClient) {
    this.matricola = 1;
    this.nome = '';
    this.cognome = '';
    this.unitaOrganizzativa = '';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  aggiungiDip() {

    const params = new HttpParams()
    .set('nome', this.nome)
    .set('cognome', this.cognome)
    .set('unitaOrganizzativa', this.unitaOrganizzativa);

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: params,
  };

    this.http.post(this.SAVE_DIPENDENTE_URL, null, httpOptions).subscribe(
      (response) => {
        // Gestisci la risposta del server qui, se necessario.
        console.log('Risposta POST:', response);
      },
      (error) => {
        // Gestisci eventuali errori qui.
        console.error('Errore POST:', error);
      }
    );

    this.dialogRef.close();
  }

}

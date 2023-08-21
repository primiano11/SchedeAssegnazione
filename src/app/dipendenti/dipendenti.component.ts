import { Component, OnInit, Optional, Inject} from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Dipendente } from './dipendente';
import { Observable } from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { CdkTable } from '@angular/cdk/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dipendenti',
  templateUrl: './dipendenti.component.html',
  styleUrls: ['./dipendenti.component.css']
})
export class DipendentiComponent {

  readonly ROOT_URL = "http://localhost:8080/api/dipendenti/getall";
  readonly DELETE_URL = "http://localhost:8080/api/dipendenti/delete";


  dipendenti: MatTableDataSource<Dipendente> = new MatTableDataSource<Dipendente>();
  displayedColumnsDipendenti: string[] = ['matricola', 'nome', 'cognome', 'unitaOrganizzativa', 'scheda', 'modifica', 'elimina'];


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

  openDialogSchede(rowData: any): void {
    const dialogRef = this.dialog.open(DialogContentSchede, { data: rowData});
  }

  openDialogUpdateDipendente(rowData: any): void {
    const dialogRef = this.dialog.open(DialogContentUpdateDipendenti, { data: rowData});

    dialogRef.afterClosed().subscribe(result => {
      this.getDipendenti();
    });
  }

  deleteDipendente(element: any): void {
    if (window.confirm("Sei sicuro di voler eliminare il dipendente " + element.nome + " " + element.cognome + "?")) {

    const params = new HttpParams().set('matricola', element.matricola);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };

    this.http.post(this.DELETE_URL, null, httpOptions).subscribe(
      (response) => {
        // Gestisci la risposta del server qui, se necessario.
        console.log('Risposta POST:', response);
        this.getDipendenti();

      },
      (error) => {
        // Gestisci eventuali errori qui.
        console.error('Errore POST:', error);
        this.getDipendenti();

      }
    );

    this.getDipendenti();

  }}

}



@Component({
  selector: 'dialog-content-dipendenti',
  templateUrl: './dialog-content-dipendenti.html',
  styleUrls: ['./dialog-content-dipendenti.css'],
})
export class DialogContentDipendenti {



  private readonly SAVE_DIPENDENTE_URL = 'http://localhost:8080/api/dipendenti/save';


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


@Component({
  selector: 'dialog-content-schede',
  templateUrl: './dialog-content-schede.html',
  styleUrls: ['./dialog-content-schede.css'],
})
export class DialogContentSchede{
  constructor(public dialogRef: MatDialogRef<DialogContentSchede>, private http: HttpClient, @Optional() @Inject(MAT_DIALOG_DATA) public rowData: any) {
  }

 obiettivi: any[] = [
  {
    codice: 'O1',
    area: 'Area X',
    tipologia: 'Incremento iscritti',
    nome: 'Miglioramento delle attività di orientamento',
    presidio: 'Facoltà di Scienze',
    stakeholder: 'Studenti, docenti, personale',
    anno: 2023,
  },
  {
    codice: 'O2',
    area: 'Area X',
    tipologia: 'Collaborazioni internazionali',
    nome: 'Potenziamento delle partnership con università estere',
    presidio: 'Dipartimento di Scienze Politiche',
    stakeholder: 'Docenti, ricercatori',
    anno: 2023,
  },
  {
    codice: 'O3',
    area: 'Area X',
    tipologia: 'Qualità insegnamento',
    nome: 'Valutazione dei corsi da parte degli studenti',
    presidio: 'Facoltà di Economia',
    stakeholder: 'Studenti, docenti',
    anno: 2023,
  },
  {
    codice: 'O4',
    area: 'Area X',
    tipologia: 'Pubblicazioni scientifiche',
    nome: 'Incremento delle pubblicazioni in riviste internazionali',
    presidio: 'Dipartimento di Matematica',
    stakeholder: 'Ricercatori',
    anno: 2023,
  },
  {
    codice: 'O5',
    area: 'Area X',
    tipologia: 'Inclusione e diversità',
    nome: 'Promozione di iniziative per studenti con disabilità',
    presidio: 'Facoltà di Lettere e Filosofia',
    stakeholder: 'Studenti, personale',
    anno: 2023,
  },
  {
    codice: 'O6',
    area: 'Area X',
    tipologia: 'Finanziamenti esterni',
    nome: 'Aumento delle richieste di finanziamento da enti esterni',
    presidio: 'Dipartimento di Fisica',
    stakeholder: 'Ricercatori',
    anno: 2023,
  },
  {
    codice: 'O7',
    area: 'Area X',
    tipologia: 'Internazionalizzazione',
    nome: 'Incremento delle opportunità di scambio internazionale per studenti',
    presidio: 'Facoltà di Giurisprudenza',
    stakeholder: 'Studenti',
    anno: 2023,
  },
  {
    codice: 'O8',
    area: 'Area X',
    tipologia: 'Collaborazioni interdisciplinari',
    nome: 'Promozione di progetti di ricerca interdisciplinari',
    presidio: 'Dipartimento di Scienze Biologiche',
    stakeholder: 'Ricercatori',
    anno: 2023,
  },
  {
    codice: 'O9',
    area: 'Area X',
    tipologia: 'Tecnologie dell\'informazione',
    nome: 'Implementazione di nuove tecnologie per la didattica a distanza',
    presidio: 'Facoltà di Ingegneria',
    stakeholder: 'Studenti, docenti',
    anno: 2023,
  }
  ];


  closeDialog(): void {
    this.dialogRef.close();
  }

}



@Component({
  selector: 'dialog-content-update-dipendenti',
  templateUrl: './dialog-content-update-dipendenti.html',
  styleUrls: ['./dialog-content-update-dipendenti.css'],
})
export class DialogContentUpdateDipendenti {



  private readonly UPDATE_DIPENDENTE_URL = 'http://localhost:8080/api/dipendenti/update';


  hide = true;

  matricola: number;
  nome: string;
  cognome: string;
  unitaOrganizzativa: string;

  constructor(public dialogRef: MatDialogRef<DialogContentDipendenti>, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public rowData: any) {
    this.matricola = rowData.matricola;
    this.nome = rowData.nome;
    this.cognome = rowData.cognome;
    this.unitaOrganizzativa = rowData.unitaOrganizzativa;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  aggiornaDip() {

    const params = new HttpParams()
    .set('matricola', this.matricola)
    .set('nome', this.nome)
    .set('cognome', this.cognome)
    .set('unitaOrganizzativa', this.unitaOrganizzativa);

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: params,
  };

    this.http.post(this.UPDATE_DIPENDENTE_URL, null, httpOptions).subscribe(
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

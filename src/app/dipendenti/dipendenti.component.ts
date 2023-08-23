import { Component, OnInit, Optional, Inject} from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Dipendente } from '../models/dipendente';
import { Observable } from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { CdkTable } from '@angular/cdk/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObiettivoIndividuale } from '../models/ObiettivoIndividuale';
import { ObiettivoSchedaDto } from '../models/obiettivoschedaDto';
import { Area } from '../models/area';


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
  listaUnita: Area[] = [];


  hide = true;

  matricola: number;
  nome: string;
  cognome: string;
  unitaOrganizzativa: Area;

  constructor(public dialogRef: MatDialogRef<DialogContentDipendenti>, private http: HttpClient) {
    this.matricola = 1;
    this.nome = '';
    this.cognome = '';
    this.unitaOrganizzativa = {
      codice: 0,
      nome: '',
      tipologia: '',
      descrizione: '',
      stakeholder: '',
      anno: 0
      }
    ;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  aggiungiDip() {

    const params = new HttpParams()
    .set('nome', this.nome)
    .set('cognome', this.cognome)
    .set('unitaOrganizzativa', this.unitaOrganizzativa.codice);

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


  getListaUnita(){
    this.http.get<Area[]>("http://localhost:8080/api/aree/getall").subscribe((data) => {
      this.listaUnita = data;
    });
  }

  ngOnInit(){
    this.getListaUnita();
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

  private readonly LOAD_OBIETTIVI_URL = 'http://localhost:8080/api/obiettivi/getoifrommatricola';
  obiettivi: ObiettivoIndividuale[] = [];


  closeDialog(): void {
    this.dialogRef.close();
  }


  caricaObiettivi(matricola: number){

    const params = new HttpParams()
    .set("matricola", matricola)

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: params,
    };


    this.http.get<ObiettivoIndividuale[]>(this.LOAD_OBIETTIVI_URL, httpOptions).subscribe((data) => {
      this.obiettivi = data;
    });
  }

  ngOnInit(){
    this.caricaObiettivi(this.rowData.matricola);
  }

}



@Component({
  selector: 'dialog-content-update-dipendenti',
  templateUrl: './dialog-content-update-dipendenti.html',
  styleUrls: ['./dialog-content-update-dipendenti.css'],
})
export class DialogContentUpdateDipendenti {



  private readonly UPDATE_DIPENDENTE_URL = 'http://localhost:8080/api/dipendenti/update';
  listaUnita: Area[] = [];

  hide = true;

  matricola: number;
  nome: string;
  cognome: string;
  unitaOrganizzativa: Area;

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
    .set('unitaOrganizzativa', this.unitaOrganizzativa.codice);

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

  getListaUnita(){
    this.http.get<Area[]>("http://localhost:8080/api/aree/getall").subscribe((data) => {
      this.listaUnita = data;
    });
  }

  ngOnInit(){
    this.getListaUnita();
  }

}

import { Component, OnInit, Optional, Inject} from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { CdkTable } from '@angular/cdk/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Area } from '../models/area';


@Component({
  selector: 'app-aree',
  templateUrl: './aree.component.html',
  styleUrls: ['./aree.component.css']
})
export class AreeComponent {

    readonly ROOT_URL = "http://localhost:8080/api/aree/getall";
    readonly DELETE_URL = "http://localhost:8080/api/aree/delete";


  constructor(private http: HttpClient, public dialog: MatDialog) {}

  aree: MatTableDataSource<Area> = new MatTableDataSource<Area>();
  displayedColumnsAree: string[] = ['codice', 'nome', 'tipologia', 'descrizione', 'stakeholder', 'anno', 'update', 'elimina'];


  ngOnInit() {
    this.getAree();
  }

  openDialogAree() {
    const dialogRef = this.dialog.open(DialogContentAree);

    dialogRef.afterClosed().subscribe(result => {
      this.getAree();
    });

  }


    getAree() {
    this.http.get<Area[]>(this.ROOT_URL).subscribe((data) => {
      this.aree = new MatTableDataSource<Area>(data);
    });
  }


  openDialogUpdateArea(rowData: any): void {
    const dialogRef = this.dialog.open(DialogContentUpdateAree, { data: rowData});

    dialogRef.afterClosed().subscribe(result => {
      this.getAree();
    });
  }

  deleteArea(element: any): void {
    if (window.confirm("Sei sicuro di voler eliminare l'area " + element.nome + "?")) {

    const params = new HttpParams().set('codice', element.codice);

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
        this.getAree();

      },
      (error) => {
        // Gestisci eventuali errori qui.
        console.error('Errore POST:', error);
        this.getAree();

      }
    );

    this.getAree();

  }}

}



@Component({
  selector: 'dialog-content-aree',
  templateUrl: './dialog-content-aree.html',
  styleUrls: ['./dialog-content-aree.css'],
})
export class DialogContentAree {

  private readonly SAVE_DIPENDENTE_URL = 'http://localhost:8080/api/aree/save';


  hide = true;

  codice: number;
  nome: string;
  tipologia: string;
  descrizione: string;
  stakeholder: string;
  anno: number;

  constructor(public dialogRef: MatDialogRef<DialogContentAree>, private http: HttpClient) {
    this.codice = 1;
    this.nome = '';
    this.tipologia = '';
    this.descrizione = '';
    this.stakeholder = '';
    this.anno = 2023;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  aggiungiArea() {

    const params = new HttpParams()
    .set('nome', this.nome)
    .set('tipologia', this.tipologia)
    .set('descrizione', this.descrizione)
    .set('stakeholder', this.stakeholder)
    .set('anno', this.anno);

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
  selector: 'dialog-content-update-aree',
  templateUrl: './dialog-content-update-aree.html',
  styleUrls: ['./dialog-content-update-aree.css'],
})
export class DialogContentUpdateAree {



  private readonly UPDATE_AREE_URL = 'http://localhost:8080/api/aree/update';


  hide = true;

  codice: number;
  nome: string;
  tipologia: string;
  descrizione: string;
  stakeholder: string;
  anno: number;

  constructor(public dialogRef: MatDialogRef<DialogContentAree>, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public rowData: any) {
    this.codice = rowData.codice;
    this.nome = rowData.nome;
    this.tipologia = rowData.tipologia;
    this.descrizione = rowData.descrizione;
    this.stakeholder = rowData.stakeholder;
    this.anno = rowData.anno;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  aggiornaDip() {

    const params = new HttpParams()
    .set('codice', this.codice)
    .set('nome', this.nome)
    .set('tipologia', this.tipologia)
    .set('descrizione', this.descrizione)
    .set('stakeholder', this.stakeholder)
    .set('anno', this.anno)

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: params,
  };

    this.http.post(this.UPDATE_AREE_URL, null, httpOptions).subscribe(
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

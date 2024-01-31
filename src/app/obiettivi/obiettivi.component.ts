import { Component, Optional, Inject } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Dipendente } from "../risorse/risorse.component";
import { ObiettivoIndividuale } from "../models/ObiettivoIndividuale";
import { ObiettivoStrategico } from "../models/ObiettivoStrategico";
import { Area } from "../models/area";
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

var index = 3;

const OBIETTIVISTRATEGICI_DATA: ObiettivoStrategico[] = [];

@Component({
  selector: "app-obiettivi",
  templateUrl: "./obiettivi.component.html",
  styleUrls: ["./obiettivi.component.css"],
})
export class ObiettiviComponent {
  constructor(public dialog: MatDialog, private http: HttpClient) {}

  @ViewChild('paginatorStrategici') paginatorStrategici!: MatPaginator;
  @ViewChild('paginatorIndividuali') paginatorIndividuali!: MatPaginator;


  readonly OI_URL = "http://localhost:8080/api/obiettivi/getalloi";
  readonly OS_URL = "http://localhost:8080/api/obiettivi/getallos";
  readonly DELETE_OI = "http://localhost:8080/api/obiettivi/deleteoi";
  readonly DELETE_OS = "http://localhost:8080/api/obiettivi/deleteos";



  obiettiviIndividuali: MatTableDataSource<ObiettivoIndividuale> = new MatTableDataSource<ObiettivoIndividuale>([]);
  obiettiviStrategici: MatTableDataSource<ObiettivoStrategico> = new MatTableDataSource<ObiettivoStrategico>();


  displayedColumnsIndividuali: string[] = [
    "obiettivoStrategico",
    "codice",
    "nome",
    "responsabile",
    "area",
    "indicatore",
    "peso",
    "anno",
    "dipendente",
    "assegna",
    "elimina"
  ];

  displayedColumnsStrategici: string[] = [
    "codice",
    "area",
    "nome",
    "stakeholder",
    "anno",
    "elimina"
  ];


  openDialogOs() {
    const dialogRef = this.dialog.open(DialogContentOs);

    dialogRef.afterClosed().subscribe(result => {
      this.getOS();
    });
  }

  openDialogOi() {
    const dialogRef = this.dialog.open(DialogContentOi);

    dialogRef.afterClosed().subscribe(result => {
      this.getOI();
    });
  }

getOI() {
  this.http.get<ObiettivoIndividuale[]>(this.OI_URL).subscribe((data) => {
    this.obiettiviIndividuali.data = data;
  });
}

  getOS() {
    this.http.get<ObiettivoStrategico[]>(this.OS_URL).subscribe((data) => {
      this.obiettiviStrategici.data = data;
    });
  }

  deleteOi(element: any): void {
    if (window.confirm("Sei sicuro di voler eliminare l'obiettivo " + element.nome + "?")) {

    const params = new HttpParams().set('codice', element.codice);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };

    this.http.post(this.DELETE_OI, null, httpOptions).subscribe(
      (response) => {

        console.log('Risposta POST:', response);
        this.getOI();

      },
      (error) => {

        console.error('Errore POST:', error);
        this.getOI();

      }
    );

    this.getOI();

  }}

  deleteOs(element: any): void {
    if (window.confirm("ATTENZIONE! Eliminando " + element.nome + " verranno eliminati tutti gli obiettivi individuali associati ad esso")){
    if (window.confirm("Sei sicuro di voler procedere?")){

    const params = new HttpParams().set('codice', element.codice);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };

    this.http.post(this.DELETE_OS, null, httpOptions).subscribe(
      (response) => {

        console.log('Risposta POST:', response);
        this.getOS();
        this.getOI();

      },
      (error) => {

        console.error('Errore POST:', error);
        this.getOS();
        this.getOI();
      }
    );

    this.getOS();
    this.getOI();

  }}}

  openDialogAssegnaOI(rowData: any): void {
    const dialogRef = this.dialog.open(DialogContentAssegnazioneOi, { data: rowData});

    dialogRef.afterClosed().subscribe(result => {
      this.getOI();
    });
  }

  ngOnInit() {
    this.getOI();
    this.getOS();
  }

  ngAfterViewInit() {
    this.obiettiviIndividuali.paginator = this.paginatorIndividuali;
    this.obiettiviStrategici.paginator = this.paginatorStrategici;
  }

}

@Component({
  selector: "dialog-content-os",
  templateUrl: "./dialog-content-os.html",
  styleUrls: ["./dialog-content-os.css"],
})
export class DialogContentOs {

  private readonly SAVE_OS_URL = 'http://localhost:8080/api/obiettivi/saveos';
  listaAree: Area[] = [];


  codice: number;
  area: Area;
  tipologia: string;
  nome: string;
  presidio: string;
  stakeholder: string;
  anno: number;

  constructor(public dialogRef: MatDialogRef<DialogContentOs>, private http: HttpClient) {
    this.codice = 0;
    this.area = {
      codice: 0,
      nome: '',
      tipologia: '',
      descrizione: '',
      stakeholder: '',
      anno: 0
      };;
    this.tipologia = "";
    this.nome = "";
    this.presidio = "";
    this.stakeholder = "";
    this.anno = 2023;
  }

  aggiungiOs() {

    const params = new HttpParams()
    .set("area", this.area.codice)
    .set("tipologia", 'x')
    .set("nome", this.nome)
    .set("presidio", 'x')
    .set("stakeholder", this.stakeholder)
    .set("anno", this.anno);

  const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
    params: params,
  };

  this.http.post(this.SAVE_OS_URL, null, httpOptions).subscribe(
    (response) => {
      console.log("Risposta POST:", response);
      this.dialogRef.close();
    },
    (error) => {

      console.error("Errore POST:", error);
      this.dialogRef.close();
    }
  );

  this.dialogRef.close();
  }


  getListaAree(){
    this.http.get<Area[]>("http://localhost:8080/api/aree/getall").subscribe((data) => {
      this.listaAree = data;
    });
  }

  ngOnInit(){
    this.getListaAree();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}





@Component({
  selector: "dialog-content-oi",
  templateUrl: "./dialog-content-oi.html",
  styleUrls: ["./dialog-content-oi.css"],
})
export class DialogContentOi {

  private readonly SAVE_OI_URL = 'http://localhost:8080/api/obiettivi/saveoi';


  hide = true;
  listaDipendenti: Dipendente[] = [];
  listaOS: ObiettivoStrategico[] = [];

  obiettivoStrategico: ObiettivoStrategico;
  codice: number;
  nome: string;
  responsabilePolitico: string;
  responsabile: string;
  tipologia: string;
  indicatore: string;
  peso: number;
  anno: number;
  dipendente: Dipendente;

  constructor(public dialogRef: MatDialogRef<DialogContentOi>, private http: HttpClient) {
    this.obiettivoStrategico = {
      codice: 0,
      area: {
        codice: 0,
        nome: '',
        tipologia: '',
        descrizione: '',
        stakeholder: '',
        anno: 0
        },
      tipologia: 'string',
      nome: '',
      presidio: '',
      stakeholder: '',
      anno: 0
    }
    ;
    this.codice = 1;
    this.nome = "";
    this.responsabilePolitico = "";
    this.responsabile = "";
    this.tipologia = '';
    this.indicatore = ''
    this.peso = 0;
    this.anno = 2023;
    this.dipendente = {matricola: 0,
      nome: '',
      cognome: '',
      unitaOrganizzativa: ''}
  }

  getListaDipendenti(){
    this.http.get<Dipendente[]>("http://localhost:8080/api/dipendenti/getall").subscribe((data) => {
      this.listaDipendenti = data;
    });
  }

  getListaOS(){
    this.http.get<ObiettivoStrategico[]>("http://localhost:8080/api/obiettivi/getallos").subscribe((data) => {
      this.listaOS = data;
    });
  }

  aggiungiOi() {

    console.log('Obiettivo Strategico:', this.obiettivoStrategico);
    console.log('Dip:', this.dipendente);

    const params = new HttpParams()
      .set("obiettivoStrategico", this.obiettivoStrategico.codice)
      .set("nome", this.nome)
      .set("responsabilePolitico", this.responsabilePolitico)
      .set("responsabile", this.responsabile)
      .set("area", this.obiettivoStrategico.area.codice)
      .set("tipologia", this.tipologia)
      .set("indicatore", this.indicatore)
      .set("peso", this.peso)
      .set("anno", this.anno)
      .set("dipendente", this.dipendente ? this.dipendente.matricola : '');

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: params,
    };

    this.http.post(this.SAVE_OI_URL, null, httpOptions).subscribe(
      (response) => {
        console.log("Risposta POST:", response);
        this.dialogRef.close();
      },
      (error) => {

        console.error("Errore POST:", error);
        this.dialogRef.close();
      }
    );

    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getListaDipendenti();
    this.getListaOS();
  }
}


@Component({
  selector: "dialog-content-assegnaoi",
  templateUrl: "./dialog-content-assegnaoi.html",
  styleUrls: ["./dialog-content-assegnaoi.css"],
})
export class DialogContentAssegnazioneOi {

  private readonly SAVE_OI_URL = 'http://localhost:8080/api/obiettivi/saveoi';


  listaDipendentiValidi: Dipendente[] = [];

  dipendente: Dipendente;

  constructor(public dialogRef: MatDialogRef<DialogContentOi>, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public rowData: any) {
    this.dipendente = {matricola: 0,
      nome: '',
      cognome: '',
      unitaOrganizzativa: ''}
  }


  getListaDipendenti(codice: number){


    const params = new HttpParams()
    .set("codice", codice)

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: params,
    };


    this.http.get<Dipendente[]>("http://localhost:8080/api/dipendenti/getbyarea", httpOptions).subscribe((data) => {
      this.listaDipendentiValidi = data;
    });
  }


  assegnaOi() {

    const params = new HttpParams()
    .set("codice", this.rowData.codice)
    .set('matricola', this.dipendente ? this.dipendente.matricola : '')

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: params,
    };

    this.http.post("http://localhost:8080/api/obiettivi/assegnaoi", null, httpOptions).subscribe(
      (response) => {
        console.log('Risposta POST:', response);
      },
      (error) => {
        console.error('Errore POST:', error);
      }
    );

    this.dialogRef.close();

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getListaDipendenti(this.rowData.area.codice);
  }
}

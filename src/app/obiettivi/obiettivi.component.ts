import { Component } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Dipendente } from "../risorse/risorse.component";
import { ObiettivoIndividuale } from "../models/ObiettivoIndividuale";
import { ObiettivoStrategico } from "../models/ObiettivoStrategico";

var index = 3;

const OBIETTIVISTRATEGICI_DATA: ObiettivoStrategico[] = [
  {
    codice: 1,
    area: "Area X",
    tipologia: "Tipologia X",
    nome: "Obiettivo strategico X",
    presidio: "Presidio X",
    stakeholder: "Stakeholder X",
    anno: 2023,
  },
  {
    codice: 2,
    area: "Area Y",
    tipologia: "Tipologia Y",
    nome: "Obiettivo strategico Y",
    presidio: "Presidio Y",
    stakeholder: "Stakeholder Y",
    anno: 2023,
  },
  {
    codice: 3,
    area: "Area Z",
    tipologia: "Tipologia Z",
    nome: "Obiettivo strategico Z",
    presidio: "Presidio Z",
    stakeholder: "Stakeholder Z",
    anno: 2023,
  },
];

@Component({
  selector: "app-obiettivi",
  templateUrl: "./obiettivi.component.html",
  styleUrls: ["./obiettivi.component.css"],
})
export class ObiettiviComponent {
  constructor(public dialog: MatDialog, private http: HttpClient) {}

  readonly OI_URL = "http://localhost:8080/api/obiettivi/getalloi";

  obiettiviIndividuali: MatTableDataSource<ObiettivoIndividuale> =
    new MatTableDataSource<ObiettivoIndividuale>();
  displayedColumnsIndividuali: string[] = [
    "obiettivoStrategico",
    "codice",
    "nome",
    "responsabilePolitico",
    "responsabile",
    "area",
    "tipologia",
    "indicatore",
    "peso",
    "anno",
    "dipendente"
  ];

  displayedColumnsStrategici: string[] = [
    "codice",
    "area",
    "tipologia",
    "nome",
    "presidio",
    "stakeholder",
    "anno",
  ];
  dataSourceObiettiviStrat = OBIETTIVISTRATEGICI_DATA;

  openDialogOs() {
    const dialogRef = this.dialog.open(DialogContentOs);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openDialogOi() {
    const dialogRef = this.dialog.open(DialogContentOi);

    dialogRef.afterClosed().subscribe(result => {
      this.getOI();
    });
  }

  getOI() {
    this.http.get<ObiettivoIndividuale[]>(this.OI_URL).subscribe((data) => {
      this.obiettiviIndividuali = new MatTableDataSource<ObiettivoIndividuale>(
        data
      );
    });
  }

  ngOnInit() {
    this.getOI();
  }
}

@Component({
  selector: "dialog-content-os",
  templateUrl: "./dialog-content-os.html",
  styleUrls: ["./dialog-content-os.css"],
})
export class DialogContentOs {
  hide = true;

  codiceObiettivo: number;
  areaStrategica: string;
  tipologia: string;
  nome: string;
  presidio: string;
  stakeholder: string;
  anno: number;

  constructor(public dialogRef: MatDialogRef<DialogContentOs>) {
    this.codiceObiettivo = 1;
    this.areaStrategica = "";
    this.tipologia = "";
    this.nome = "";
    this.presidio = "";
    this.stakeholder = "";
    this.anno = 2023;
  }

  aggiungiOs() {
    index = index + 1;

    const newElement: ObiettivoStrategico = {
      codice: index,
      area: this.areaStrategica,
      tipologia: this.tipologia,
      nome: this.nome,
      presidio: this.presidio,
      stakeholder: this.stakeholder,
      anno: this.anno,
    };
    this.dialogRef.close(newElement);
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

  obiettivoStrategico: string;
  codice: number;
  nome: string;
  responsabilePolitico: string;
  responsabile: string;
  area: string;
  tipologia: string;
  indicatore: string;
  peso: number;
  anno: number;
  dipendente: Dipendente;

  constructor(public dialogRef: MatDialogRef<DialogContentOi>, private http: HttpClient) {
    this.obiettivoStrategico = "";
    this.codice = 1;
    this.nome = "";
    this.responsabilePolitico = "";
    this.responsabile = "";
    this.area = "";
    this.tipologia = "";
    this.indicatore = "";
    this.peso = 0;
    this.anno = 2023;
    this.dipendente = {matricola: 0,
      nome: "",
      cognome: "",
      unitaOrganizzativa: ""}
  }

  getListaDipendenti(){
    this.http.get<Dipendente[]>("http://localhost:8080/api/dipendenti/getall").subscribe((data) => {
      this.listaDipendenti = data;
    });
  }

  aggiungiOi() {
    index = index + 1;

    const params = new HttpParams()
      .set("obiettivoStrategico", this.obiettivoStrategico)
      .set("nome", this.nome)
      .set("responsabilePolitico", this.responsabilePolitico)
      .set("responsabile", this.responsabile)
      .set("area", this.area)
      .set("tipologia", this.tipologia)
      .set("indicatore", this.indicatore)
      .set("peso", this.peso)
      .set("anno", this.anno)
      .set("dipendente", this.dipendente.matricola);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: params,
    };

    this.http.post(this.SAVE_OI_URL, null, httpOptions).subscribe(
      (response) => {
        console.log("Risposta POST:", response);
      },
      (error) => {
        // Gestisci eventuali errori qui.
        console.error("Errore POST:", error);
      }
    );

    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getListaDipendenti();
  }
}

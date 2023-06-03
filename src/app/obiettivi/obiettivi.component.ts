import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface ObiettivoStrategico{
  codice: number;
  area: string;
  tipologia: string;
  nome: string;
  presidio: string;
  stakeholder: string;
  anno: number;
}

export interface ObiettivoIndividuale{
  obiettivoStrategico: string;
  codice: number;
  obopstr: string;
  responsabilePolitico: string;
  responsabile: string;
  area: string;
  tipologia: string;
  indicatore: string;
  peso: number;
  anno: number;
}

var index = 3;


const OBIETTIVISTRATEGICI_DATA: ObiettivoStrategico[] = [

  {codice: 1, area: 'Area X', tipologia: 'Tipologia X', nome: 'Obiettivo strategico X', presidio: 'Presidio X', stakeholder: 'Stakeholder X', anno: 2023},
  {codice: 2, area: 'Area Y', tipologia: 'Tipologia Y', nome: 'Obiettivo strategico Y', presidio: 'Presidio Y', stakeholder: 'Stakeholder Y', anno: 2023},
  {codice: 3, area: 'Area Z', tipologia: 'Tipologia Z', nome: 'Obiettivo strategico Z', presidio: 'Presidio Z', stakeholder: 'Stakeholder Z', anno: 2023}

]

const OBIETTIVIINDIVIDUALI_DATA: ObiettivoIndividuale[] = [

  {obiettivoStrategico: 'Obiettivo Strategico X', codice: 1, obopstr: 'Titolo X', responsabilePolitico: 'Responsabile Politico X', responsabile: 'Responsabile X', area: 'Area X', tipologia: 'Tipologia X', indicatore: 'Indicatore X', peso: 10, anno: 2023},
  {obiettivoStrategico: 'Obiettivo Strategico Y', codice: 1, obopstr: 'Titolo Y', responsabilePolitico: 'Responsabile Politico Y', responsabile: 'Responsabile Y', area: 'Area Y', tipologia: 'Tipologia Y', indicatore: 'Indicatore Y', peso: 10, anno: 2023},
  {obiettivoStrategico: 'Obiettivo Strategico Z', codice: 1, obopstr: 'Titolo Z', responsabilePolitico: 'Responsabile Politico Z', responsabile: 'Responsabile Z', area: 'Area Z', tipologia: 'Tipologia Z', indicatore: 'Indicatore Z', peso: 10, anno: 2023}

]


@Component({
  selector: 'app-obiettivi',
  templateUrl: './obiettivi.component.html',
  styleUrls: ['./obiettivi.component.css'],
})
export class ObiettiviComponent {

  constructor(public dialog: MatDialog) {}

  openDialogOs() {

    const dialogRef = this.dialog.open(DialogContentOs);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Aggiungi i dati del form alla tabella
      const newElement: ObiettivoStrategico = result;
      this.dataSourceObiettiviStrat = [...this.dataSourceObiettiviStrat, newElement]; // Aggiungi il nuovo elemento all'array
    }
  });
  }

  openDialogOi() {

    const dialogRef = this.dialog.open(DialogContentOi);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Aggiungi i dati del form alla tabella
      const newElement: ObiettivoIndividuale = result;
      this.dataSourceObiettiviIndividuali = [...this.dataSourceObiettiviIndividuali, newElement]; // Aggiungi il nuovo elemento all'array
    }
  });
  }


  displayedColumnsStrategici: string[] = ['codice', 'area', 'tipologia', 'nome', 'presidio', 'stakeholder', 'anno'];
  displayedColumnsIndividuali: string[] = ['obiettivoStrategico', 'codice', 'obopstr', 'responsabilePolitico', 'responsabile', 'area', 'tipologia', 'indicatore', 'peso', 'anno'];
  dataSourceObiettiviStrat = OBIETTIVISTRATEGICI_DATA;
  dataSourceObiettiviIndividuali = OBIETTIVIINDIVIDUALI_DATA;
  panelOpenState = false;
  panelOpenState2 = false;



}

@Component({
  selector: 'dialog-content-os',
  templateUrl: './dialog-content-os.html',
  styleUrls: ['./dialog-content-os.css'],

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
    this.areaStrategica = '';
    this.tipologia = '';
    this.nome = '';
    this.presidio = '';
    this.stakeholder = '';
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
      anno: this.anno
    };
    this.dialogRef.close(newElement);
  }

}



@Component({
  selector: 'dialog-content-oi',
  templateUrl: './dialog-content-oi.html',
  styleUrls: ['./dialog-content-oi.css'],

})
export class DialogContentOi {

  hide = true;


obiettivoStrategico: string;
codice: number;
obopstr: string;
responsabilePolitico: string;
responsabile: string;
area: string;
tipologia: string;
indicatore: string;
peso: number;
anno: number;

  constructor(public dialogRef: MatDialogRef<DialogContentOi>) {
    this.obiettivoStrategico = '';
    this.codice = 1;
    this.obopstr = '';
    this.responsabilePolitico = '';
    this.responsabile = '';
    this.area = '';
    this.tipologia = '';
    this.indicatore = '';
    this.peso = 0;
    this.anno = 0;
  }

  aggiungiOi() {

    index = index + 1;

    const newElement: ObiettivoIndividuale = {
      obiettivoStrategico: this.obiettivoStrategico,
      codice: index,
      obopstr: this.obopstr,
      responsabilePolitico: this.responsabilePolitico,
      responsabile: this.responsabile,
      area: this.area,
      tipologia: this.tipologia,
      indicatore: this.indicatore,
      peso: this.peso,
      anno: this.anno
    };

    this.dialogRef.close(newElement);
  }

}



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

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

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

  openDialog() {

    const dialogRef = this.dialog.open(DialogContent);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Aggiungi i dati del form alla tabella
      const newElement: ObiettivoStrategico = result;
      this.dataSourceObiettiviStrat = [...this.dataSourceObiettiviStrat, newElement]; // Aggiungi il nuovo elemento all'array
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
  selector: 'dialog-content',
  templateUrl: './dialog-content.html',
  styleUrls: ['./dialog-content.css'],

})
export class DialogContent {

  hide = true;

  codiceObiettivo: number;
  areaStrategica: string;
  tipologia: string;
  nome: string;
  presidio: string;
  stakeholder: string;
  anno: number;

  constructor(public dialogRef: MatDialogRef<DialogContent>) {
    this.codiceObiettivo = 1;
    this.areaStrategica = '';
    this.tipologia = '';
    this.nome = '';
    this.presidio = '';
    this.stakeholder = '';
    this.anno = 2023;
  }

  aggiungi() {
    const newElement: ObiettivoStrategico = {
      codice: this.codiceObiettivo,
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



import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';



export interface Dipendente {

matricola: number;
nome: string;
cognome: string;
unitaOrganizzativa: string;

}

const DIPENDENTI_DATA: Dipendente[] = [

  {matricola: 1,
    nome: 'Mario',
    cognome: 'Rossi',
    unitaOrganizzativa: 'Unità organizzativa X'},


  {matricola: 2,
    nome: 'Irene',
    cognome: 'Bianchi',
    unitaOrganizzativa: 'Unità organizzativa Y'},


  {matricola: 3,
    nome: 'Elisa',
    cognome: 'Verdi',
    unitaOrganizzativa: 'Unità organizzativa Y'}

]


var index = 3;


@Component({
  selector: 'app-risorse',
  templateUrl: './risorse.component.html',
  styleUrls: ['./risorse.component.css']
})
export class RisorseComponent {

  constructor(public dialog: MatDialog) {}


  displayedColumnsDipendenti: string[] = ['matricola', 'nome', 'cognome', 'unitaOrganizzativa'];
  dataSourceDipendenti = DIPENDENTI_DATA;
  panelOpenState = false;



  openDialogDipendenti() {

    const dialogRef = this.dialog.open(DialogContentDip);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Aggiungi i dati del form alla tabella
      const newElement: Dipendente = result;
      this.dataSourceDipendenti = [...this.dataSourceDipendenti, newElement]; // Aggiungi il nuovo elemento all'array
    }
  });
  }


}



@Component({
  selector: 'dialog-content-dip',
  templateUrl: './dialog-content-dip.html',
  styleUrls: ['./dialog-content-dip.css'],
})
export class DialogContentDip {

  hide = true;

  matricola: number;
  nome: string;
  cognome: string;
  unitaOrganizzativa: string;

  constructor(public dialogRef: MatDialogRef<DialogContentDip>) {
    this.matricola = 1;
    this.nome = '';
    this.cognome = '';
    this.unitaOrganizzativa = '';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  aggiungiDip() {

    index = index + 1;

    const newElement: Dipendente = {
      matricola: index,
      nome: this.nome,
      cognome: this.cognome,
      unitaOrganizzativa: this.unitaOrganizzativa,
    };
    this.dialogRef.close(newElement);
  }

}

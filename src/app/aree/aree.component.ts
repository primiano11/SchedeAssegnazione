import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


export interface Area {

  codice: number;
  nome: string;
  tipologia: string;
  descrizione: string;
  stakeholder: string;
  anno: number;

  }

  const AREE_DATA: Area[] = [

    {codice: 1,
      nome: 'Area X',
      tipologia: 'Tipologia X',
      descrizione: 'Descrixione X',
      stakeholder:'Stakeholder X',
      anno: 2023},


      {codice: 2,
        nome: 'Area Y',
        tipologia: 'Tipologia Y',
        descrizione: 'Descrixione Y',
        stakeholder:'Stakeholder Y',
        anno: 2023},


        {codice: 3,
          nome: 'Area Z',
          tipologia: 'Tipologia Z',
          descrizione: 'Descrixione Z',
          stakeholder:'Stakeholder Z',
          anno: 2023},

  ]


  var index = 3;


@Component({
  selector: 'app-aree',
  templateUrl: './aree.component.html',
  styleUrls: ['./aree.component.css']
})
export class AreeComponent {


  constructor(public dialog: MatDialog) {}


  displayedColumnsAree: string[] = ['codice', 'nome', 'tipologia', 'descrizione', 'stakeholder', 'anno'];
  dataSourceAree = AREE_DATA;
  panelOpenState = false;



  openDialogAree() {

    const dialogRef = this.dialog.open(DialogContentAree);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Aggiungi i dati del form alla tabella
      const newElement: Area = result;
      this.dataSourceAree = [...this.dataSourceAree, newElement]; // Aggiungi il nuovo elemento all'array
    }
  });
  }

}



@Component({
  selector: 'dialog-content-aree',
  templateUrl: './dialog-content-aree.html',
  styleUrls: ['./dialog-content-aree.css'],
})
export class DialogContentAree {

  hide = true;

  codice: number;
  nome: string;
  tipologia: string;
  descrizione: string;
  stakeholder: string;
  anno: number;

  constructor(public dialogRef: MatDialogRef<DialogContentAree>) {
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

    index = index + 1;

    const newElement: Area = {
      codice: index,
      nome: this.nome,
      tipologia: this.tipologia,
      descrizione: this.descrizione,
      stakeholder: this.stakeholder,
      anno: 2023
    };
    this.dialogRef.close(newElement);
  }

}

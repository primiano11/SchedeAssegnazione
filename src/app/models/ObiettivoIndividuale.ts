import { Dipendente } from './dipendente';

export interface ObiettivoIndividuale {
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
}

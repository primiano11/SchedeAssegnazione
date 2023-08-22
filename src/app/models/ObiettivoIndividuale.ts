import { ObiettivoStrategico } from './ObiettivoStrategico';
import { Area } from './area';
import { Dipendente } from './dipendente';

export interface ObiettivoIndividuale {
  obiettivoStrategico: ObiettivoStrategico;
  codice: number;
  nome: string;
  responsabilePolitico: string;
  responsabile: string;
  area: Area;
  tipologia: string;
  indicatore: string;
  peso: number;
  anno: number;
  dipendente: Dipendente;
}

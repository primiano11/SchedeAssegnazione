import { Area } from "./area";

export interface ObiettivoStrategico {
  codice: number;
  area: Area;
  tipologia: string;
  nome: string;
  presidio: string;
  stakeholder: string;
  anno: number;
}

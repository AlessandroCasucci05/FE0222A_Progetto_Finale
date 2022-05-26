import { Cliente } from "./cliente";

export interface Fattura {
  id: number;
  data: Date;
  numero: number;
  anno: number;
  importo: number;
  stato: {
    id: number;
    nome: string;
  };
  cliente: Cliente;
}


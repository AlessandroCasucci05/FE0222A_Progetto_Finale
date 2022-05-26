import { Comune } from "./comune";
import { Provincia } from "./provincia";

export interface Sede {
  via:string,
  civico:string,
  cap:string,
  localita:string,
  comune:Comune
}

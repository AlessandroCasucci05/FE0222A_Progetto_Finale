import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Fattura } from '../models/fattura';

@Injectable({
  providedIn: 'root'
})
export class FattureService {

  apiURL:string= environment.pathApi;

  constructor(private http:HttpClient, private router: Router) {}

  getFatture(page:number){
    return this.http.get<any>(this.apiURL+"/api/fatture?page="+page+"&size=20&sort=id,ASC");
  }

  getSingleFattura(id:number){
    return this.http.get<any>(this.apiURL+"/api/fatture/"+id);
  }

  changeFatturaStatus(fattura:Fattura,id:number){
    return this.http.put<Fattura>(this.apiURL+"/api/fatture/"+id,fattura);
  }

  removeFattura(fatturaID:number){
    return this.http.delete<any>(this.apiURL+"/api/fatture/"+fatturaID);
  }

  fattureByClient(id:number,page:number){
    return this.http.get<any>(this.apiURL+'/api/fatture/cliente/'+id+'?page='+page+'&size=20&sort=id,ASC');
  }

  getFatturaStatus(){
    return this.http.get<any>(this.apiURL+"/api/statifattura?page=0&size=20&sort=id,ASC");
  }

  creaFattura(fattura:any){
    return this.http.post<any>(this.apiURL+"/api/fatture",fattura);
  }







}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {
  urlApi:string= environment.pathApi;


  constructor(private http:HttpClient) { }


  getAllClients(page:number){
     return this.http.get<any>(this.urlApi+'/api/clienti?page='+page+'&size=20&sort=id,ASC');
  }

  creaCliente(client:Cliente){
    return this.http.post(this.urlApi+'/api/clienti',client);
  }

  deleteClient(id:number){
    return this.http.delete(this.urlApi+'/api/clienti/'+id);
  }

  getSingleClient(id:number){
    return this.http.get<Cliente>(this.urlApi+'/api/clienti/'+id);
  }

  getClientType(){
    return this.http.get<any>(this.urlApi+'/api/clienti/tipicliente');
  }

  getAllProvince(){
    return this.http.get<any>(this.urlApi+'/api/province?page=0&size=20&sort=id,ASC');
  }

  getAllComuni(){
    return this.http.get<any>(this.urlApi+'/api/comuni?page=0&size=20&sort=id,ASC');
  }

  changeClient(id:number, client:Cliente){
     return this.http.put<any>(this.urlApi+'/api/clienti/'+id,client);
  }

  getByRagioneSociale(ragioneSociale:string){
    return this.http.get<any>(this.urlApi+'/api/clienti/ragionesociale?nome='+ragioneSociale);
  }




}




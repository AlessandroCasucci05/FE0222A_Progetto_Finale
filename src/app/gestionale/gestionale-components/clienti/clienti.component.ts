import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClientiService } from './clienti.service';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {

  dati:any;
  clienti!:Cliente[];
  ricerca:boolean=false;
  loaded:boolean=false;
  numberPage: number=0;
  eliminazione:{id:number,index:number,permesso:boolean}= {index:0,id:0,permesso:false};


  constructor(private clientSrv:ClientiService, private router: Router) {
    this.getClients(this.numberPage);
   }

  ngOnInit(): void {
  }

   getClients(id:number){
     this.ricerca=false;
     this.loaded=false;
     this.clientSrv.getAllClients(id).subscribe(
       (data)=>{
          this.dati=data;
          this.clienti=data.content;
          this.loaded=true;
          this.numberPage= data.pageable.pageNumber;
       }
     )
   }

   elimina(index:number,id:number){
       this.eliminazione.id=id;
       this.eliminazione.index=index;
       this.eliminazione.permesso=true;
   }

   async deleteUser(){
      if (this.eliminazione.permesso){
         this.clientSrv.deleteClient(this.eliminazione.id).subscribe(
           (data)=>{
            this.clienti.splice(this.eliminazione.index, 1);
            this.router.navigate(['/clienti']);
         })

      }
   }

   cerca(ragioneeSoc:string) {
    this.ricerca=true;
    this.loaded=false;
      this.clientSrv.getByRagioneSociale(ragioneeSoc).subscribe(
        (res)=>{
            this.dati=res;
            this.clienti=res.content;
            this.numberPage=res.pageable.pageNumber;
            this.loaded=true;
        }
      )
   }

}

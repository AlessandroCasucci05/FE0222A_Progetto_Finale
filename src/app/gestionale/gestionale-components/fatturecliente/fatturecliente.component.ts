import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Fattura } from 'src/app/models/fattura';
import { FattureService } from 'src/app/services/fatture.service';
import { ClientiService } from '../clienti/clienti.service';

@Component({
  selector: 'app-fatturecliente',
  templateUrl: './fatturecliente.component.html',
  styleUrls: ['./fatturecliente.component.scss']
})
export class FattureclienteComponent implements OnInit {

  id!:number;
  client!:Cliente;
  dati!:any;
  fatture!:Fattura[];

  constructor(private actrouter:ActivatedRoute, private fattureSrv:FattureService, private clientSrv:ClientiService) { }

  ngOnInit(): void {
    this.actrouter.params.subscribe(params=>{
      const id= +params['id'];
      this.id=id;

    })

    this.getFatture(0);
    this.getClient();


  }

  getFatture(page:number){
    this.fattureSrv.fattureByClient(this.id,page).subscribe(
      (res)=>{
        this.dati=res;
        this.fatture=res.content;
      }
    )
  }

  getClient(){
    this.clientSrv.getSingleClient(this.id).subscribe(
      (res)=>{
        this.client=res;
      }
    )
  }

  pageChange(page:number){
     if (page===-1 || page===this.dati.totalPages){
       return;
     }
     this.getFatture(page);
  }

}

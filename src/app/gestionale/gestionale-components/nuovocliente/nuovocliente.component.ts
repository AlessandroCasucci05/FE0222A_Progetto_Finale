import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Comune } from 'src/app/models/comune';
import { Provincia } from 'src/app/models/provincia';
import { ClientiService } from '../clienti/clienti.service';

@Component({
  selector: 'app-nuovocliente',
  templateUrl: './nuovocliente.component.html',
  styleUrls: ['./nuovocliente.component.scss']
})
export class NuovoclienteComponent implements OnInit {

  clientForm!:FormGroup;
  province!:Provincia[];
  tipiClienti!:any;
  comuni!:Comune[];
  prov:string="";
  cliente:any={ragioneSociale:'',
  partitaIva:'',
  email:'',
  pec:'',
  telefono:'',
  telefonoContatto:'',

  nomeContatto:'',
  cognomeContatto:'',
  tipoCliente:'',
  emailContatto:'',
  dataInserimento:new Date,
  dataUltimoContatto:new Date,

  indirizzoSedeLegale:{

    via:'',
    civico:'',
    cap:'',
    localita:'',
    comune:{
      nome:'',
      provincia:{
       },
      id:3
    }


  },
  indirizzoSedeOperativa:{
    via:'',
    civico:'',
    cap:'',
    localita:'',
    comune:{
      nome:'',
      provincia:{

      },
      id:2
    }

  }

};

  constructor(private fb:FormBuilder, private clientSrv:ClientiService, private router:Router) {

  }

  ngOnInit(): void {
    this.formSettings();
    this.getComuni();
    this.getProv();
    this.getTipi();

  }

  formSettings(){
    this.clientForm=this.fb.group({
      ragionesociale:["",Validators.required],
      email:["", [Validators.required, Validators.email]],
      partitaiva:["",Validators.required],
      pec:[""],
      tipocliente:["",Validators.required],
      telefono:[""],
      nomecontatto:[""],
      cognomecontatto:[""],
      telefonocontatto:[""],
      emailcontatto:["",[Validators.required, Validators.email]],
      via:[""],
      civico:[""],
      cap:[""],
      localita:[""],
      comune:["",Validators.required],
      provincia:[""]
    })
  }

  getProv(){
    this.clientSrv.getAllProvince().subscribe(
      (res)=>{
        this.province=res.content;
      }
    )
  }

  getComuni(){
    this.clientSrv.getAllComuni().subscribe(
      (res)=>{
        this.comuni=res.content;
      }
    )
  }

  getTipi(){
    this.clientSrv.getClientType().subscribe(
      (res)=>{
        this.tipiClienti=res;
      }
    )
  }

  updateProv(){
     let id= this.clientForm.value.comune;
     let com= this.comuni.find((x)=>{
       return x.id===+id;
     })
     this.prov=com?.provincia.nome;
  }

  trovaCom(id:number){
    let com= this.comuni.find((x)=>{
      return x.id===+id;
    })

    if (com){
      return com;
    }else{
      return this.cliente.indirizzoSedeOperativa.comune;
    }

  }



  onSubmit(){

    this.cliente.ragioneSociale=this.clientForm.value.ragionesociale;
    this.cliente.partitaIva=this.clientForm.value.partitaiva;
    this.cliente.email=this.clientForm.value.email;
    this.cliente.pec=this.clientForm.value.pec;
    this.cliente.tipoCliente=this.clientForm.value.tipocliente;
    this.cliente.telefono=this.clientForm.value.telefono;
    this.cliente.nomeContatto=this.clientForm.value.nomecontatto;
    this.cliente.cognomeContatto=this.clientForm.value.cognomecontatto;
    this.cliente.telefonoContatto=this.clientForm.value.telefonocontatto;
    this.cliente.emailContatto=this.clientForm.value.emailcontatto;
    this.cliente.indirizzoSedeOperativa.via=this.clientForm.value.via;
    this.cliente.indirizzoSedeOperativa.civico=this.clientForm.value.civico;
    this.cliente.indirizzoSedeOperativa.cap=this.clientForm.value.cap;
    this.cliente.indirizzoSedeOperativa.localita=this.clientForm.value.localita;
    this.cliente.indirizzoSedeOperativa.comune=this.trovaCom(this.clientForm.value.comune);
    this.clientSrv.creaCliente(this.cliente).subscribe(
      (res)=>{
        alert('Cliente registrato con successo!');
        this.router.navigate(['/clienti']);
      }
    )
  }

}

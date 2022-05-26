import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Comune } from 'src/app/models/comune';
import { Provincia } from 'src/app/models/provincia';
import { ClientiService } from '../clienti/clienti.service';

@Component({
  selector: 'app-modificacliente',
  templateUrl: './modificacliente.component.html',
  styleUrls: ['./modificacliente.component.scss']
})
export class ModificaclienteComponent implements OnInit {

  cliente!:Cliente;
  clientForm!:FormGroup;
  comuni!:Comune[];
  province!:Provincia[];
  provinciaAggiornata!:string;
  comune!:string;
  tipiCliente!:any[];
  clienteNew!:Cliente;


  constructor(private http:HttpClient, private actrou:ActivatedRoute,
     private router:Router, private clientSrv:ClientiService, private fb:FormBuilder) {
    }


   ngOnInit(): void {

    this.actrou.params.subscribe((params:Params)=>{
      const id= +params['id'];
        this.clientSrv.getSingleClient(id).subscribe(
          (res)=>{
            this.cliente=res;
            this.clienteNew=res;
            this.provinciaAggiornata=res.indirizzoSedeOperativa.comune.provincia.nome;
            this.comune=res.indirizzoSedeOperativa.comune.nome;
          }
      )
    })

    this.getComuni();
    this.getProvince();
    this.getTipi();
    this.formSettings();
  }


  getComuni(){
    this.clientSrv.getAllComuni().subscribe(
      (res)=>{
        this.comuni=res.content;
      }
    )
  }

  getProvince(){
    this.clientSrv.getAllProvince().subscribe(
      (res)=>{
        this.province=res.content;
      }
    )
  }

  getTipi(){
    this.clientSrv.getClientType().subscribe(
      (res)=>{
        this.tipiCliente=res;
      }
    )
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

  get ragionesociale(){
    return this.clientForm.get("ragionesociale");
  }

  get email(){
    return this.clientForm.get("email");
  }

  get partitaiva(){
    return this.clientForm.get("partitaiva");
  }

  get pec(){
    return this.clientForm.get("pec");
  }

  get tipocliente(){
    return this.clientForm.get("tipocliente");
  }

  get telefono(){
    return this.clientForm.get("telefono");
  }

  get nomecontatto(){
    return this.clientForm.get("nomecontatto");
  }

  get cognomecontatto(){
    return this.clientForm.get("cognomecontatto");
  }

  get telefonocontatto(){
    return this.clientForm.get("telefonocontatto");
  }

  get emailcontatto(){
    return this.clientForm.get("emailcontatto");
  }

  get via(){
    return this.clientForm.get("via");
  }

  get civico(){
    return this.clientForm.get("civico");
  }

  get cap(){
    return this.clientForm.get("cap");
  }

  get localita(){
    return this.clientForm.get("localita");
  }

  get name(){
    return this.clientForm.get("name");
  }

  get provincia(){
    return this.clientForm.get("provincia");
  }

  trovaComune(id:number):Comune{
    let com= this.comuni.find((x)=>{
       return x.id===+id;
    })
    if (com){
      return com;
    }
    return this.clienteNew.indirizzoSedeOperativa.comune;
  }


  updateProvincia(){
    let id= this.clientForm.value.comune;
    let com= this.comuni.find((x)=>{
      return x.id===+id;
   })
   if (com){
     this.comune=com.nome;
     this.provinciaAggiornata=com.provincia.nome;
   }else{
    this.provinciaAggiornata=this.clienteNew.indirizzoSedeOperativa.comune.provincia.nome;
   }
  }


  onSubmit(){
    this.clienteNew.ragioneSociale= this.clientForm.value.ragionesociale;
    this.clienteNew.partitaIva=this.clientForm.value.partitaiva;
    this.clienteNew.email=this.clientForm.value.email;
    this.clienteNew.tipoCliente=this.clientForm.value.tipocliente;
    this.clienteNew.pec=this.clientForm.value.pec;
    this.clienteNew.telefono=this.clientForm.value.telefono;
    this.clienteNew.nomeContatto=this.clientForm.value.nomecontatto;
    this.clienteNew.cognomeContatto=this.clientForm.value.cognomecontatto;
    this.clienteNew.telefonoContatto=this.clientForm.value.telefonocontatto;
    this.clienteNew.emailContatto=this.clientForm.value.emailcontatto;
    this.clienteNew.indirizzoSedeOperativa.via=this.clientForm.value.via;
    this.clienteNew.indirizzoSedeOperativa.civico=this.clientForm.value.civico;
    this.clienteNew.indirizzoSedeOperativa.cap=this.clientForm.value.cap;
    this.clienteNew.indirizzoSedeOperativa.comune= this.trovaComune(this.clientForm.value.comune);

    this.clientSrv.changeClient(this.cliente.id,this.clienteNew).subscribe(
      (res)=>{
        alert("Utente inserito con successo!");
        this.router.navigate(['/clienti']);
      }
    )
  }

}

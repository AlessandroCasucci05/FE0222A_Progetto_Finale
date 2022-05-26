import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { FattureService } from 'src/app/services/fatture.service';
import { ClientiService } from '../clienti/clienti.service';

@Component({
  selector: 'app-nuovafattura',
  templateUrl: './nuovafattura.component.html',
  styleUrls: ['./nuovafattura.component.scss']
})
export class NuovafatturaComponent implements OnInit {

  client!:Cliente;
  id!:number;
  fatturastatus:any;
  fatturaForm!:FormGroup;

  newFattura= {data:new Date, numero:0, anno:0,importo:0, stato:{
    id:1,
    nome:"PAGATA"
  },
  cliente: {
    id:2
  }
 }

  constructor(private router:Router,private fb:FormBuilder,private clientSrv:ClientiService, private actrouter:ActivatedRoute, private fatturaSrv:FattureService) { }

  ngOnInit(): void {
    this.actrouter.params.subscribe(params=>{
      const id= +params['id'];
      this.id=id;
    });
    this.getClient(this.id);
    this.getStatus();
    this.formSettings();
  }

  formSettings(){
     this.fatturaForm=this.fb.group({
       data:["", Validators.required],
       numero:["",[Validators.required,Validators.pattern('^[0-9]*$')]],
       importo:["",[Validators.required,Validators.pattern('^[0-9]*$')]],
       anno:["",[Validators.required,Validators.pattern('^[0-9]*$')]],
       stato:["",Validators.required]


     })
     console.log(this.fatturaForm);
  }

  getClient(id:number){
    this.clientSrv.getSingleClient(this.id).subscribe(
      (res)=>{
        this.client=res;
      }
    )
  }

  getStatus(){
    this.fatturaSrv.getFatturaStatus().subscribe(
      (res)=>{
        this.fatturastatus=res.content;
      }
    )
  }

  trovaStato(id:number){
     if (+id===1){
       console.log("pagata");
       return {id:1,nome:"PAGATA"};
     }
     console.log("non pagata");
     return {id:2,nome:"NON PAGATA"};
  }

  onSubmit(){

     this.newFattura.data=this.fatturaForm.value.data;
     this.newFattura.anno=this.fatturaForm.value.anno;
     this.newFattura.numero=this.fatturaForm.value.numero;
     this.newFattura.importo=this.fatturaForm.value.importo;
     this.newFattura.cliente={id:this.id};
     this.newFattura.stato=this.trovaStato(this.fatturaForm.value.stato);
     console.log(this.newFattura.stato);
     this.fatturaSrv.creaFattura(this.newFattura).subscribe(
       (res)=>{
         alert("Registrazione effettuata con successo!");
         this.router.navigate(['/fatturecliente',this.id]);
       }
     )
  }

}

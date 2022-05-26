import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Fattura } from 'src/app/models/fattura';
import { FattureService } from 'src/app/services/fatture.service';

@Component({
  selector: 'app-fatturadetails',
  templateUrl: './fatturadetails.component.html',
  styleUrls: ['./fatturadetails.component.scss']
})
export class FatturadetailsComponent implements OnInit {

  fatturaDettaglio!:Fattura;
  data!: Date;
  statoattivo!:string;
  statoDaSelezionare!:string;
  statusForm!: FormGroup;
  valueOnePayed!: boolean;

  constructor(private router:ActivatedRoute, private fattureSrv:FattureService, private fb:FormBuilder, private ro:Router) {
       this.statusForm=this.fb.group({
          option:  ["",Validators.required]
       })
       this.valueOnePayed=true;
  }

  ngOnInit(): void {
    this.router.params.subscribe((params:Params) =>{
      const id= +params['id'];
      this.fattureSrv.getSingleFattura(id).subscribe(
        (data)=>{
           this.fatturaDettaglio=data;
           this.data= data.data;
           data.stato.id===1 ? this.statoattivo= "PAGATA" : this.statoattivo="NON PAGATA";
           this.statoattivo==="PAGATA" ? this.statoDaSelezionare="NON PAGATA" : this.statoDaSelezionare="PAGATA";
           if (this.statoattivo==="NON PAGATA") this.valueOnePayed=false;
           console.log(this.statusForm);
           console.log(this.valueOnePayed);
        }
      )
    })
  }

  salva(){
    let app=this.statusForm.value.option;
     if (this.valueOnePayed){

      if(+app===1){
        this.fatturaDettaglio.stato.nome="PAGATA";
        this.fatturaDettaglio.stato.id=1;
      }else{
        this.fatturaDettaglio.stato.nome="NON PAGATA";
        this.fatturaDettaglio.stato.id=2;
      }
    }else{
      if(+app!==1){
        this.fatturaDettaglio.stato.nome="PAGATA";
        this.fatturaDettaglio.stato.id=1;
      }else{
        this.fatturaDettaglio.stato.nome="NON PAGATA";
        this.fatturaDettaglio.stato.id=2;
      }
    }

    this.fattureSrv.changeFatturaStatus(this.fatturaDettaglio,this.fatturaDettaglio.id).subscribe(
      (data)=>{
        this.ro.navigate(['/fatture']);
      }
    );


  }


  deleteFatt(){
    this.fattureSrv.removeFattura(this.fatturaDettaglio.id).subscribe(
      (data)=>{
        this.ro.navigate(['/fatture']);
        alert("Fattura eliminata");
      }
    )
  }



















}

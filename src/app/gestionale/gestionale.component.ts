import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-gestionale',
  templateUrl: './gestionale.component.html',
  styleUrls: ['./gestionale.component.scss']
})
export class GestionaleComponent implements OnInit {

  user!:any;
  nome:string="";



  constructor(private authSrv:AuthService) {
   }




  ngOnInit(): void {
     if (localStorage.getItem("utentecorrente")!==null){
       this.user= localStorage.getItem("utentecorrente");
       this.user= JSON.parse(this.user);
       this.nome= this.user.username;
     }
  }





}

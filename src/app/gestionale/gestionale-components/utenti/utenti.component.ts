import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss']
})
export class UtentiComponent implements OnInit {

  utenti!: Array<User>;
  dati: any;
  loaded:boolean;

  constructor(private authSrv:AuthService) {
    this.loaded=false;
    this.getAll(0);
  }
  ngOnInit(): void {
  }

  getAll(page:number){
    this.authSrv.getAllUsers(page).subscribe(
      (data)=>{
        this.loaded=false;
        this.dati=data;
        this.utenti= data.content;
        this.loaded=true;
      },
      (error) =>{
        console.log(error);
      }
    )
  }


}

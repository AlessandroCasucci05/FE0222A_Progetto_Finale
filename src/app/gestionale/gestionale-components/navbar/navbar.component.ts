import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userLogged!:boolean;


  constructor(private authSrv:AuthService) {


   }

  ngOnInit(): void {
    this.authSrv.on<boolean>().subscribe(data => {
      this.userLogged=data;
    })
  }

  changeNav(){
    this.userLogged=this.authSrv.isLogged;
  }

  logOut(){
     this.authSrv.logOut();
  }

}

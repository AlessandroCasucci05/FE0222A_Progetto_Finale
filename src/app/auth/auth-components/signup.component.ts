import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private authSrv:AuthService, private router:Router, private fb:FormBuilder) {
    this.loginForm= this.fb.group({
       username: ['',[Validators.required, Validators.minLength(4)]],
       email:['',[Validators.required, Validators.email]],
       password:['',[Validators.required, Validators.minLength(6)]],
       role: ['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  logged(){
    return this.authSrv.isLogged;
  }

  get username(){
    return this.loginForm.get("username");
  }

  get email(){
    return this.loginForm.get("email");
  }
  get password(){
    return this.loginForm.get("password");
  }

  get role(){
    return this.loginForm.get("role");
  }

  async signUp(){
     let role2:string;
     if (this.role!==null){
       +this.role.value===1 ? role2="admin" : role2="user";
       this.loginForm.value.role= [role2];
     }
     try{
       await this.authSrv.signUp(this.loginForm.value).toPromise();
       this.router.navigate(['/login']);
     }catch(err){
       this.loginForm.reset();
       alert(err);

     }

  }

}

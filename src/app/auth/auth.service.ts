import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public logged = new BehaviorSubject<any>(this.isLogged);

  urlApi: string;
  private utenteSub= new BehaviorSubject<null|User>(null);
  user$= this.utenteSub.asObservable();

  constructor(private http:HttpClient, private router:Router) {
      this.urlApi= environment.pathApi;
      this.checkIfLogged();
   }

   checkIfLogged(){
      const utente= localStorage.getItem("utentecorrente");
      if (utente){
         const utenteAppoggio: User= JSON.parse(utente);
         this.utenteSub.next(utenteAppoggio);
      }

   }


   getAllUsers(num:number){
     return this.http.get<any>(this.urlApi+'/api/users?page='+num);
   }

   signUp(user:any){
     return this.http.post<any>(this.urlApi+'/api/auth/signup', user).pipe(
       catchError(this.decifraErrori)
     );
   }

   logIn(user:{username:string, password:string}){
    return this.http.post<User>(this.urlApi+'/api/auth/login', user).pipe(
      tap((user)=>{
         this.utenteSub.next(user);
         localStorage.setItem('utentecorrente',JSON.stringify(user));
        this.emit<boolean>(true);
      }),
      catchError(this.decifraErrori)
    );

   }

   logOut(){
     this.utenteSub.next(null);
     localStorage.removeItem("utentecorrente");
     this.emit<boolean>(false);
     this.router.navigate(['/login']);
   }

   get isLogged(): boolean{
     return localStorage.getItem('utentecorrente') !=null;
   }

   private decifraErrori(err:any){
    switch (err.error) {
      case 'Email and password are required':
        return throwError('ERRORE: La mail e la password sono obbligatorie');
        break;
      case 'Email already exists':
        return throwError('ERRORE: Questo utente è già registrato');
        break;
      case 'Email format is invalid':
        return throwError("ERRORE: Il formato dell'email non è valido");
        break;
      case 'Cannot find user':
        return throwError("ERRORE: Questo utente non esiste");
        break;
      default:
        return throwError("Errore nella compilazione dei campi!");
        break;
    }

   }

   emit<T>(data:T){
      this.logged.next(data);
   }

   on<T>(): Observable<T>{
     return this.logged.asObservable();
   }

}

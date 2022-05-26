import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthinterceptorInterceptor implements HttpInterceptor {

  tenant: string;
  token: string;


  constructor() {
     this.tenant=environment.adminTenant;
     this.token='Bearer '+environment.adminToken;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let myReq: HttpRequest<any> = request;
    myReq =request.clone({
       headers: request.headers
       .set('Authorization', this.token)
       .set("X-TENANT-ID", this.tenant),
    });
    return next.handle(myReq);
  }
}

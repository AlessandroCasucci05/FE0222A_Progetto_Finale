import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/auth-components/login.component';
import { SignupComponent } from '../auth/auth-components/signup.component';
import { AuthGuard } from '../auth/auth.guard';
import { LoginGuard } from '../auth/login.guard';
import { ClientiComponent } from './gestionale-components/clienti/clienti.component';
import { FattureComponent } from './gestionale-components/fatture/fatture.component';
import { FattureclienteComponent } from './gestionale-components/fatturecliente/fatturecliente.component';
import { FatturadetailsComponent } from './gestionale-components/fatturedetails/fatturadetails.component';
import { ModificaclienteComponent } from './gestionale-components/modificacliente/modificacliente.component';
import { NuovafatturaComponent } from './gestionale-components/nuovafattura/nuovafattura.component';
import { NuovoclienteComponent } from './gestionale-components/nuovocliente/nuovocliente.component';
import { UtentiComponent } from './gestionale-components/utenti/utenti.component';
import { GestionaleComponent } from './gestionale.component';

const routes: Routes = [
  {
     path:'',
     component: GestionaleComponent,
  },
  {
    path:'clienti',
    canActivate: [AuthGuard],
    component:ClientiComponent
  },
  {
    path:'utenti',
    canActivate: [AuthGuard],
    component:UtentiComponent
  },
  {
    path:'fatture',
    canActivate: [AuthGuard],
    component:FattureComponent,
  },
  {
    path:'login',
    canActivate:[LoginGuard],
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:"nuovocliente",
    canActivate: [AuthGuard],
    component:NuovoclienteComponent
  },
  {
    path:":id",
    canActivate: [AuthGuard],
    component: FatturadetailsComponent,
  },
  {
    path:"modificacliente/:id",
    canActivate: [AuthGuard],
    component:ModificaclienteComponent
  },
  {
    path:"fatturecliente/:id",
    canActivate: [AuthGuard],
    component:FattureclienteComponent
  },
  {
    path:"nuovafattura/:id",
    canActivate: [AuthGuard],
    component:NuovafatturaComponent
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionaleRoutingModule { }

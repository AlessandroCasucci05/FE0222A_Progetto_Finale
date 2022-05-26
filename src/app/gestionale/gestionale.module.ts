import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionaleRoutingModule } from './gestionale-routing.module';
import { ClientiComponent } from './gestionale-components/clienti/clienti.component';
import { UtentiComponent } from './gestionale-components/utenti/utenti.component';
import { FattureComponent } from './gestionale-components/fatture/fatture.component';
import { FatturadetailsComponent } from './gestionale-components/fatturedetails/fatturadetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificaclienteComponent } from './gestionale-components/modificacliente/modificacliente.component';
import { NuovoclienteComponent } from './gestionale-components/nuovocliente/nuovocliente.component';
import { FattureclienteComponent } from './gestionale-components/fatturecliente/fatturecliente.component';
import { NuovafatturaComponent } from './gestionale-components/nuovafattura/nuovafattura.component';
import { LoginComponent } from '../auth/auth-components/login.component';



@NgModule({
  declarations: [
    LoginComponent,
    ClientiComponent,
    UtentiComponent,
    FattureComponent,
    FatturadetailsComponent,
    ModificaclienteComponent,
    NuovoclienteComponent,
    FattureclienteComponent,
    NuovafatturaComponent
  ],
  imports: [
    CommonModule,
    GestionaleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GestionaleModule { }

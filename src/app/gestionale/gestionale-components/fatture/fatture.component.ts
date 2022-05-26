import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Fattura } from 'src/app/models/fattura';
import { FattureService } from 'src/app/services/fatture.service';
import { ClientiService } from '../clienti/clienti.service';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss'],
})
export class FattureComponent implements OnInit {
  dati: any;
  fatture!: Fattura[];
  fattureByRagioneSociale: boolean=false;

  constructor(
    private fattureSrv: FattureService,
    private clientSrv: ClientiService
  ) {}

  ngOnInit(): void {
    this.getFatture(0);
  }

  getFatture(page: number) {
    this.fattureSrv.getFatture(page).subscribe((data) => {
      this.dati = data;
      this.fatture = data.content;
    });
  }

  cercaByRagioneSociale(ragSoc: string, page: number) {
    let cliente: Cliente[] = [];
    this.clientSrv.getByRagioneSociale(ragSoc).subscribe((data) => {
      console.log(data);
      cliente = data.content;
      console.log(cliente);
      this.fattureSrv.fattureByClient(cliente[0].id, page).subscribe((data) => {
        this.dati=data;
        this.fatture = data.content;
        console.log(this.fatture);
        this.fattureByRagioneSociale=true;
      });
    });
  }

  ripristina(input: HTMLInputElement) {
    this.getFatture(0);
    input.value = '';
    this.fattureByRagioneSociale=false;
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestionale',
  templateUrl: './gestionale.component.html',
  styleUrls: ['./gestionale.component.scss']
})
export class GestionaleComponent implements OnInit {

  cont:number=0;



  constructor() {
    if (this.cont===0){
      /* window.location.reload(); */
      this.cont++;
    }

   }




  ngOnInit(): void {
  }





}

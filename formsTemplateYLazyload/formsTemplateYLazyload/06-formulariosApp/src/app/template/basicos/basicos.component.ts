import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto: 'superCobayo',
    precio: 10,
    existencias: 10
  }

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean {

    /* Versión anterior
        this.miFormulario?.controls.producto?.invalid; */ 

    return this.miFormulario?.controls['producto']?.invalid &&
           this.miFormulario?.controls['producto']?.touched;
  }

  precioValido(): boolean {
    return this.miFormulario?.controls['precio']?.touched &&
           this.miFormulario?.controls['precio']?.value < 0;
           
  }

  guardar(){
    console.log('Posteo exitoso');

    this.miFormulario.resetForm(
      {
        precio: 0,
        existencias: 0
      }
    );
  }

}

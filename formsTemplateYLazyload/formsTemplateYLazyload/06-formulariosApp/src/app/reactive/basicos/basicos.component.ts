import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit{

  /*miFormulario:  FormGroup = new FormGroup({
    nombre: new FormControl('Cobayo'),
    precio: new FormControl(0),
    existencias: new FormControl(0)
  });*/

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.minLength(3) ] ],
    precio: [ , [ Validators.required, Validators.min(0)]],
    existencias: [ , [ Validators.required, Validators.min(0)] ]

  })

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'cobayo',
      precio: 10
    })
  }

  isCampoValido( campo: string) {
    return this.miFormulario.controls[campo].errors && 
           this.miFormulario.controls[campo].touched;
  }

  guardar() {

    if( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value)

    this.miFormulario.reset();
  }

}

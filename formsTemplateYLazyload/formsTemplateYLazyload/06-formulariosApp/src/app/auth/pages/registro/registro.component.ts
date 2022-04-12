import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})

export class RegistroComponent implements OnInit {

  //TODO: Temporal
  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  noPuedeSerDenSiste( argumento: FormControl ) {
    const valor: string = argumento.value?.trim().toLowerCase();
    if ( valor === 'densiste' ){
      return {
        noDenSiste: true,
      }
    }

    return null;
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern( this.nombreApellidoPattern ) ]],
    email: ['', [ Validators.required, Validators.pattern( this.emailPattern )]],
    username: ['', [ Validators.required, this.noPuedeSerDenSiste ]]
  })

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Facundo Rodriguez',
      email: 'test@test.com',
      username: 'cobayo'
    })
  }

  invalidField( field: string ) {
    return this.miFormulario.get(field)?.invalid
           && this.miFormulario.get(field)?.touched;
  }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}

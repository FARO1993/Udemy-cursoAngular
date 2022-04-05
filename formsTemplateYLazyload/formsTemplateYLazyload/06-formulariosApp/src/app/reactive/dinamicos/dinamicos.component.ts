import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, Validator } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  //miFormulario
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.minLength(3) ]],
    favoritos: this.fb.array( [
      [ 'Halo', Validators.required ],
      [ 'League Of Legends', Validators.required ]
    ], Validators.required )
  });

  nuevoFavorito: FormControl = this.fb.control( '', Validators.required );


  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor( private fb: FormBuilder ) { }

  isCampoValido( campo: string) {
    return this.miFormulario.controls[campo].errors && 
           this.miFormulario.controls[campo].touched;
  }

  agregarFavorito() {
    if( this.nuevoFavorito.invalid ) {
      return;
    }

    //Se puede realizar de las siguientes dos maneras.

    //this.favoritosArr.push( new FormControl(this.nuevoFavorito.value ));

    this.favoritosArr.push( this.fb.control( this.nuevoFavorito.value, Validators.required ));

    this.nuevoFavorito.reset();

  }

  guardar() {

    if( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value)

    this.miFormulario.reset();
  }

  borrar(i: number) {

    this.favoritosArr.removeAt( i );
  }

}

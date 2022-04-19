import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})

export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern ) ]],
    email: ['', [ Validators.required, Validators.pattern( this.validatorService.emailPattern )], [ this.emailValidator ]],
    username: ['', [ Validators.required, this.validatorService.noPuedeSerDenSiste ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]]
  }, {
    validators: [ this.validatorService.camposIguales('password', 'password2') ]
  })

  get emailErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors;

    if( errors?.[ 'required' ] ) {
      return 'Email es obligatorio.'
    }

    if( errors?.[ 'pattern' ] ) {
      return 'El formato de correo es incorrecto.'
    }

    if( errors?.[ 'emailError' ] ) {
      return 'El correo ya existe.'
    }

    return '';

  }

  constructor( private fb: FormBuilder,
               private validatorService: ValidatorService,
               private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Facundo Rodriguez',
      email: 'test@test.com',
      username: 'cobayo',
      password: '123456',
      password2: '123456'
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

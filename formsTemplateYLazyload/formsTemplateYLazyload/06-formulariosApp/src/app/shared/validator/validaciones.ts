/*
    Se podria realizar de esta forma
    para validaciones sencillas.

import { FormControl } from "@angular/forms";




export const nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

export const noPuedeSerDenSiste = ( argumento: FormControl ) => {
    const valor: string = argumento.value?.trim().toLowerCase();
    if ( valor === 'densiste' ){
      return {
        noDenSiste: true,
      }
    }

    return null;
}

*/
import { Component } from '@angular/core';

interface Persona {
  nombre: string;
  favoritos: Favorito[]
}

interface Favorito {
  id: number;
  nombre: string
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  nuevoJuego: string = "";

  persona: Persona = {
    nombre: "Facundo",
    favoritos: [
      {
        id: 1,
        nombre: "Halo"
      },
      {
        id: 2,
        nombre: "Call Of Duty"
      },
      {
        id: 3,
        nombre: "League Of Legends"
      }
    ]
  }

  guardar(){
    console.log('Formulario guardado con éxito')
  }

  agregar() {
    
    const juegoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego  
    }

    this.persona.favoritos.push({...juegoFavorito});

    this.nuevoJuego="";

  }

  eliminar( index: number){
    //Para eliminar usamos el método splice(indice inicial, cuantos elementos quiero borrar)
    this.persona.favoritos.splice(index, 1)
  }

}

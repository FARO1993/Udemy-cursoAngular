import { Component } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent{
  termino: string = "";
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe | undefined;
  error: boolean = false;

  constructor( private heroesService: HeroesService){}

  buscar(){
    this.heroesService.getSugerencias( this.termino.trim() ).subscribe( resp => {
      this.heroes = resp;  
    })
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ){

    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }
      const heroe: Heroe = event.option.value;
      this.termino = heroe.superhero;

      this.heroesService.getHeroeById( heroe.id! ).subscribe(heroe => {
      this.heroeSeleccionado = heroe;
      })   
  }
}





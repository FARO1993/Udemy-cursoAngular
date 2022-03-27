import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
   `.container:{
     margin: 10px;
    }
   
    img{
      width: 100%;
      border-radius: 5px;
    }
  `]
})

export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( private activatedRouter: ActivatedRoute,
               private heroesService: HeroesService,
               private router : Router) { }

  ngOnInit()  {
    /*Método que utilizo la mayoría de las veces.
    let idHeroe = this.router.snapshot.paramMap.get("id");
    console.log(idHeroe)
 
    this.heroesService.getHeroeById(idHeroe!).subscribe( res => {
    this.heroe = res;
    })*/

    //Métodos aconsejados.
    //siwtchMap para utilizar el dato obtenido por parámtro.
    this.activatedRouter.params.pipe( 
      switchMap( ({ id }) => this.heroesService.getHeroeById(id))
    ).subscribe( heroe => this.heroe = heroe);
  
  }

  regresar(){
    this.router.navigate(['heroes/listado'])
  }

}

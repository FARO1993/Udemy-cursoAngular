import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px
    }  
  `
  ]
})
export class AgregarComponent implements OnInit {

  publisher = [
    {
      id: "DC Comics",
      desc: "DC - Comics"
    },
    {
      id: "Marvel Comics",
      desc: "Marvel - Comics"
    }
  ];
  
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  editMode: boolean = false;

  constructor( private heroesService: HeroesService, 
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private _snackBar: MatSnackBar,
               public dialog: MatDialog ) { }

  ngOnInit(): void {

    //Si es editar
    if( this.router.url.includes('editar')){
      this.activatedRoute.params.pipe( 
        switchMap( ({ id }) => this.heroesService.getHeroeById(id))
      ).subscribe( heroe => {
        this.heroe = heroe
        this.editMode = true; 
      });
    }
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id){
      //actualizar
      this.heroesService.actualizarHeroe( this.heroe ).subscribe( heroe => {
        this.mostrarSnackbar("SuperHeroe actualizado");
      })
    } else {
      //crear
      this.heroesService.agregarHeroe( this.heroe ).subscribe( heroe => {
        this.router.navigate([`/heroes/editar/${ heroe.id }`]);
        this.mostrarSnackbar("SuperHeroe creado");
      })
    }
  }

  borrar(){

    const dialog = this.dialog.open( DialogComponent, {
      width: '300px',
      height: '200px',
      data: this.heroe,
    } )

    dialog.afterClosed().subscribe(
      (result) => {
        if( result ){
          this.heroesService.borrarHeroe( this.heroe.id! ).subscribe( resp => {
          this.router.navigate(['/heroes/listado']);
          this.mostrarSnackbar("SuperHeroe eliminado");
          })
        }
      }
    )
  }

  mostrarSnackbar( mensaje: string ) {
    this._snackBar.open( mensaje, 'cerrar', {
      duration: 3000,
    } )
  }
}

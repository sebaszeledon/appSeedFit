import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificationService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.css']
})
export class ProductIndexComponent implements OnInit {

  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  infoProducto: any;

  constructor(
    private gService: GenericService,
    private notificacion: NotificationService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.listaProductos();
   }

  ngOnInit(): void {
  }

  listaProductos() {
    /*
    Utilizar el servicios genérico para listar los videojuegos
    * Acción list indicando la ruta, recordando que indica únicamente lo que falta después de 'http://127.0.0.1:8000/api/v1/
    * takeUntil cerrar la subscripción, cuando se destruye el componente
    * Subscripción a la solicitud
    * Opcional console.log solo si es necesario verificar los datos en tiempo de desarrollo
    * this.datos guardar la información en una variable, está se utilizará en el HTML para su respectiva presentación
    * capturar los errores y presentar una notificación
    * */
    this.gService
      .list('seedfit/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

  agregarProducto(id: number) {
    this.gService
      .get('seedfit', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.infoProducto = data;
        this.cartService.addToCart(this.infoProducto);
        this.notificacion.mensaje(
          'Orden',
          'Producto agregado a la orden',
          'success'
        );
      });
  }

}

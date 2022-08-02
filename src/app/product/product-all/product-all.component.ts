import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificationService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent implements OnInit {

  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.listaproductos();
    this.mensajesUpdate();
    this.mensajesCreate();
  }

  mensajesUpdate() {
    let update = false;
    //Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      update = params.update || false;
    });
    if (update) {
      this.notification.mensaje(
        'Actualizado!',
        'Se actualizó el producto correctamente.',
        'success'
      );
    }
  }

  mensajesCreate() {
    let register = false;
    //Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      register = params.register || false;
    });
    if (register) {
      this.notification.mensaje(
        'Creado!',
        'Se ha creado el producto correctamente.',
        'success'
      );
    }
  }

  listaproductos() {
    this.gService
      .list('seedfit/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

}

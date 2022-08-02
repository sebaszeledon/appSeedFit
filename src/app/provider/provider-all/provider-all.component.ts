import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificationService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-provider-all',
  templateUrl: './provider-all.component.html',
  styleUrls: ['./provider-all.component.css']
})
export class ProviderAllComponent implements OnInit {

  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.listaproveedores();
    this.mensajesCreate();
    this.mensajesUpdate();
  }

  listaproveedores() {
    this.gService
      .list('seedfit/provider')
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

  mensajesCreate() {
    let register = false;
    //Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      register = params.register || false;
    });
    if (register) {
      this.notification.mensaje(
        'Agregado!',
        'Se ha agregado el proveedor correctamente.',
        'success'
      );
    }
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
        'Se actualizó el proveedor correctamente.',
        'success'
      );
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificationService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-agent-all',
  templateUrl: './agent-all.component.html',
  styleUrls: ['./agent-all.component.css']
})
export class AgentAllComponent implements OnInit {

  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.listaagentes();
    this.mensajesCreate();
    this.mensajesUpdate();
  }

  listaagentes() {
    this.gService
      .list('seedfit/agent')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
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
        'Se ha agregado el agente correctamente.',
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
        'Se actualizó el agente correctamente.',
        'success'
      );
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

}

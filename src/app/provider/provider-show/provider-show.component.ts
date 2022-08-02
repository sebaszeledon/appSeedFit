import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-provider-show',
  templateUrl: './provider-show.component.html',
  styleUrls: ['./provider-show.component.css']
})
export class ProviderShowComponent implements OnInit {

  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //Obtener el id del proveedor
    let id = +this.route.snapshot.paramMap.get('id');
    //Obtener el proveedor
    this.obtenerProveedor(id);
  }

  obtenerProveedor(id: any) {
    this.gService
      .get('seedfit/provider', id)
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

}

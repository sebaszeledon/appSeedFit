import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-transaction-all',
  templateUrl: './transaction-all.component.html',
  styleUrls: ['./transaction-all.component.css']
})
export class TransactionAllComponent implements OnInit {

  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) { }

  ngOnInit(): void {
    this.listaTransacciones();
  }

  listaTransacciones() {
    this.gService
      .list('seedfit/transaction')
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

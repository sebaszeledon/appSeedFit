import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificationService } from 'src/app/share/notification.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-transaction-index',
  templateUrl: './transaction-index.component.html',
  styleUrls: ['./transaction-index.component.css']
})
export class TransactionIndexComponent implements OnInit {

  currentUser: any;
  isAutenticated!: boolean;
  items: ItemCart[] = [];
  total = 0;
  fecha = new Date();
  qtyItems = 0;
  type_id = 1;
  tipo = 1;
  tipos: any;
  desc = "";
  obs = "";
  destroy$: Subject<boolean> = new Subject<boolean>();
  //formCreate!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    public fb: FormBuilder,
    private cartService: CartService,
    private noti: NotificationService,
    private gService: GenericService,
    private router: Router
  ) {
    //this.reactiveForm();
    this.getTipos();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.countItems.subscribe((value) => {
      this.qtyItems = value;
    });

  }

  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total = this.cartService.getTotal();
    //this.noti.mensaje('Orden', 'Cantidad actualizada', 'success');
  }

  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
    this.cartService.countItems2();
    this.noti.mensaje('Orden', 'Producto eliminado de la orden', 'warning');
  }

  ordenar() {
    console.log(this.tipo, this.desc, this.obs);

    if (this.qtyItems > 0) {
      let detalles = { type_id: this.tipo, total: this.total, desc: this.desc, obs: this.obs,
        qtyItems: this.qtyItems, detalles: this.cartService.getItems() };
      this.gService
        .create('seedfit/transaction', detalles)
        .subscribe((respuesta: any) => {
          this.noti.mensaje(
            'Transacción',
            'Orden registrada satisfactoriamente',
            'success'
          );
          this.cartService.deleteCart();
          this.items = this.cartService.getItems();
          this.total = this.cartService.getTotal();
          this.desc = " ";
          this.obs = " ";
        });
    } else {
      this.noti.mensaje('Transacción', 'Agregue productos a la orden por favor', 'warning');
    }
  }

  /*reactiveForm() {
    this.formCreate = this.fb.group({
      type_id: ['', [Validators.required]],
    });
    this.getTipos();
  }*/

  getTipos() {
    this.gService
      .list('seedfit/type')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.tipos = data;
      });
  }


}

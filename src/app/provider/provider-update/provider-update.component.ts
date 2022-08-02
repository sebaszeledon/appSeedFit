import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/share/notification.service';
import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-provider-update',
  templateUrl: './provider-update.component.html',
  styleUrls: ['./provider-update.component.css']
})
export class ProviderUpdateComponent implements OnInit {

  proveedor: any;
  formUpdate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notification: NotificationService
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getProveedor(id);
   }

   getProveedor(id: number) {
    this.gService.get('seedfit/provider', id).subscribe((respuesta: any) => {
      this.proveedor = respuesta;
      //Obtenida la información del producto
      //se construye el formulario
      this.reactiveForm();
    });
  }

  reactiveForm() {
    if (this.proveedor) {
    this.formUpdate = this.fb.group({
      id: [this.proveedor.id, [Validators.required]],
      description: [this.proveedor.description , [Validators.required]],
      website: [this.proveedor.website , [Validators.required]],
      country: [this.proveedor.country , [Validators.required]],
      address: [this.proveedor.address, [Validators.required]],
    });
    }
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.makeSubmit = true;
    if(this.formUpdate.invalid){
      return;
    }
    this.gService.update('seedfit/provider', this.formUpdate.value).subscribe(
      (respuesta:any) => {
        this.proveedor = respuesta;
        this.router.navigate(['/proveedor'], {
        queryParams: {update: 'true'},
        });
      }
    );
  }

  onReset() {
    this.formUpdate.reset();
  }

  onBack() {
    this.router.navigate(['/proveedor']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formUpdate.controls[control].hasError(error) &&
      this.formUpdate.controls[control].invalid &&
      (this.makeSubmit || this.formUpdate.controls[control].touched)
    );
  };

}

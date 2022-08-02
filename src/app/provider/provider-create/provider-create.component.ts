import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/share/notification.service';
import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-provider-create',
  templateUrl: './provider-create.component.html',
  styleUrls: ['./provider-create.component.css']
})
export class ProviderCreateComponent implements OnInit {

  proveedor: any;
  formCreate!: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notification: NotificationService
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      description: ['', [Validators.required]],
      website: ['', [Validators.required]],
      country: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  submitForm() {
    this.makeSubmit = true;
    if(this.formCreate.invalid){
      return;
    }
    this.gService.create('seedfit/provider', this.formCreate.value).subscribe(
      (respuesta:any) => {
        this.proveedor = respuesta;
        this.router.navigate(['/proveedor'], {
        queryParams: {register: 'true'},
        });
      }
    );
  }

  onReset() {
    this.formCreate.reset();
  }

  onBack() {
    this.router.navigate(['/proveedor']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };


}

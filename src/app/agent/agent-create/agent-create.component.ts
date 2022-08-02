import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/share/notification.service';
import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agent-create',
  templateUrl: './agent-create.component.html',
  styleUrls: ['./agent-create.component.css']
})
export class AgentCreateComponent implements OnInit {

  agente: any;
  proveedores: any;
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
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      provider_id: ['', [Validators.required]],
    });
    this.getProviders();
  }

  submitForm() {
    this.makeSubmit = true;
    if(this.formCreate.invalid){
      return;
    }
    this.gService.create('seedfit/agent', this.formCreate.value).subscribe(
      (respuesta:any) => {
        this.agente = respuesta;
        this.router.navigate(['/agente'], {
        queryParams: {register: 'true'},
        });
      }
    );
  }

  getProviders() {
    this.gService
      .list('seedfit/provider')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.proveedores = data;
      });
  }

  onReset() {
    this.formCreate.reset();
  }

  onBack() {
    this.router.navigate(['/agente']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/share/notification.service';
import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agent-update',
  templateUrl: './agent-update.component.html',
  styleUrls: ['./agent-update.component.css']
})
export class AgentUpdateComponent implements OnInit {

  agente: any;
  proveedores: any;
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
    this.getAgente(id);
   }

   getAgente(id: number) {
    this.gService.get('seedfit/agent', id).subscribe((respuesta: any) => {
      this.agente = respuesta;
      //Obtenida la información del producto
      //se construye el formulario
      this.reactiveForm();
    });
  }

  reactiveForm() {
    this.getProviders();
    if (this.agente) {
    this.formUpdate = this.fb.group({
      id: [this.agente.id, [Validators.required]],
      name: [this.agente.name , [Validators.required]],
      lastname: [this.agente.lastname , [Validators.required]],
      phone: [this.agente.phone , [Validators.required]],
      email: [this.agente.email, [Validators.required]],
      provider_id: [this.agente.provider_id , [Validators.required]],
    });
    }
  }

  getProviders() {
    this.gService
      .list('seedfit/provider')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.proveedores = data;
      });
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.makeSubmit = true;
    if(this.formUpdate.invalid){
      return;
    }
    this.gService.update('seedfit/agent', this.formUpdate.value).subscribe(
      (respuesta:any) => {
        this.agente = respuesta;
        this.router.navigate(['/agente'], {
        queryParams: {update: 'true'},
        });
      }
    );
  }

  onReset() {
    this.formUpdate.reset();
  }

  onBack() {
    this.router.navigate(['/agente']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formUpdate.controls[control].hasError(error) &&
      this.formUpdate.controls[control].invalid &&
      (this.makeSubmit || this.formUpdate.controls[control].touched)
    );
  };

}

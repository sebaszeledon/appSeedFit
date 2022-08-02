import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificationService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  formulario!: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;

  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
   }

   // Definir el formulario con sus reglas de validación
  reactiveForm() {
    /*https://angular.io/guide/reactive-forms
   https://angular.io/api/forms/Validators */
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mensajes();
  }

  mensajes() {
    let register = false;
    //Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      register = params.register || false;
    });
    if (register) {
      this.notification.mensaje(
        'Usuario',
        'Registro satisfactorio! Especifique su credenciales para ingresar',
        'success'
      );
    }
  }

  onReset() {
    this.formulario.reset();
  }

  submitForm() {
    this.makeSubmit = true;
    //Validación
    if (this.formulario.invalid) {
      return;
    }
    //console.log(this.formulario.value);
    this.authService
      .loginUser(this.formulario.value)
      .subscribe((respuesta: any) => {
        (this.infoUsuario = respuesta), this.router.navigate(['/']);
      });
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };

}

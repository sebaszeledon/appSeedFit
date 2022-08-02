import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificationService } from 'src/app/share/notification.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  producto: any;
  imageURL: string;
  categoriesList: any;
  sizesList: any;
  providersList: any;
  storagesList: any;
  error: any;
  makeSubmit: boolean = false;
  formCreate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notification: NotificationService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      cost: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      price: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      categories: this.fb.array([]),
      category_id: this.fb.array([]),
      sizes: this.fb.array([]),
      size_id: this.fb.array([]),
      providers: this.fb.array([]),
      provider_id: this.fb.array([]),
      storages: this.fb.array([]),
      storage_id: this.fb.array([]),
      image: [''],
    });
    this.getcategories();
    this.getsizes();
    this.getproviders();
    this.getStorages();
  }

  ngOnInit(): void {
  }

  //Categorias
  getcategories() {
    return this.gService.list('seedfit/category').subscribe(
      (respuesta: any) => {
        (this.categoriesList = respuesta), this.checkboxcategories();
      },
      (error) => {
        this.error = error;
        this.notification.msjValidacion(this.error);
      }
    );
  }
  get categories(): FormArray {
    return this.formCreate.get('categories') as FormArray;
  }
  get category_id(): FormArray {
    return this.formCreate.get('category_id') as FormArray;
  }

  private checkboxcategories() {
    this.categoriesList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.categories as FormArray).push(control);
    });
  }

  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.category_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.category_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.category_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  //Tallas
  getsizes() {
    return this.gService.list('seedfit/size').subscribe(
      (respuesta: any) => {
        (this.sizesList = respuesta), this.checkboxsizes();
      },
      (error) => {
        this.error = error;
        this.notification.msjValidacion(this.error);
      }
    );
  }

  get sizes(): FormArray {
    return this.formCreate.get('sizes') as FormArray;
  }
  get size_id(): FormArray {
    return this.formCreate.get('size_id') as FormArray;
  }

  private checkboxsizes() {
    this.sizesList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.sizes as FormArray).push(control);
    });
  }

  onCheckChangeSizes(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.size_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.size_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.size_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  //Proveedores
  getproviders() {
    return this.gService.list('seedfit/provider').subscribe(
      (respuesta: any) => {
        (this.providersList = respuesta), this.checkboxproviders();
      },
      (error) => {
        this.error = error;
        this.notification.msjValidacion(this.error);
      }
    );
  }

  get providers(): FormArray {
    return this.formCreate.get('providers') as FormArray;
  }
  get provider_id(): FormArray {
    return this.formCreate.get('provider_id') as FormArray;
  }

  private checkboxproviders() {
    this.providersList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.providers as FormArray).push(control);
    });
  }

  onCheckChangeProviders(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.provider_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.provider_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.provider_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  //Storages
  getStorages() {
    return this.gService.list('seedfit/storage').subscribe(
      (respuesta: any) => {
        (this.storagesList = respuesta), this.checkboxstorages();
      },
      (error) => {
        this.error = error;
        this.notification.msjValidacion(this.error);
      }
    );
  }

  get storages(): FormArray {
    return this.formCreate.get('storages') as FormArray;
  }
  get storage_id(): FormArray {
    return this.formCreate.get('storage_id') as FormArray;
  }

  private checkboxstorages() {
    this.storagesList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.storages as FormArray).push(control);
    });
  }

  onCheckChangeStorages(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.storage_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.storage_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.storage_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  //Obtener la imagen o archivo seleccionado
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formCreate.get('image').setValue(file);
      // Vista previa imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    this.makeSubmit = true;

    let formData = new FormData();
    formData = this.gService.toFormData(this.formCreate.value);
    formData.append('_method', 'POST');
    this.gService
      .create_formdata('seedfit', formData)
      .subscribe((respuesta: any) => {
        this.producto = respuesta;
        this.router.navigate(['/producto/all'], {
          queryParams: { register: 'true' },
        });
      });
  }

  onReset() {
    this.formCreate.reset();
  }

  onBack() {
    this.router.navigate(['/producto/all']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };

}

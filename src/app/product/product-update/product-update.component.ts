import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificationService } from 'src/app/share/notification.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  producto: any;
  imageURL: string;
  categoriesList: any;
  sizesList: any;
  providersList: any;
  storagesList: any;
  error: any;
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
    this.getProducto(id);
   }

   getProducto(id: number) {
    this.gService.get('seedfit', id).subscribe((respuesta: any) => {
      this.producto = respuesta;
      //Obtenida la información del producto
      //se construye el formulario
      this.reactiveForm();
    });
  }

  reactiveForm() {

    this.getcategories();
    this.getsizes();
    this.getproviders();
    this.getStorages();

    if (this.producto) {
      //Cargar la información del producto
      //en los controles que conforman el formulario
      this.formUpdate = this.fb.group({
        id: [this.producto.id, [Validators.required]],
        name: [this.producto.name, [Validators.required]],
        code: [this.producto.code, [Validators.required]],
        cost: [this.producto.cost, [Validators.required, Validators.pattern('[0-9]+')],],
        price: [this.producto.price, [Validators.required, Validators.pattern('[0-9]+')],],
        image: [''],
        categories: this.fb.array([]),
        category_id: this.fb.array([]),
        sizes: this.fb.array([]),
        size_id: this.fb.array([]),
        providers: this.fb.array([]),
        provider_id: this.fb.array([]),
        storages: this.fb.array([]),
        storage_id: this.fb.array([]),
      });
      // Vista previa imagen
      this.imageURL = this.producto.image;
    }

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
    return this.formUpdate.get('categories') as FormArray;
  }
  get category_id(): FormArray {
    return this.formUpdate.get('category_id') as FormArray;
  }

  private checkboxcategories() {
    this.categoriesList.forEach((o) => {
      let selected = false;
      if (this.producto.categories.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.formUpdate.controls.categories as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.formUpdate.controls.category_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }

  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formUpdate.controls.category_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.category_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formUpdate.controls.category_id as FormArray).removeAt(i);
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
    return this.formUpdate.get('sizes') as FormArray;
  }
  get size_id(): FormArray {
    return this.formUpdate.get('size_id') as FormArray;
  }

  private checkboxsizes() {
    this.sizesList.forEach((o) => {
      let selected = false;
      if (this.producto.sizes.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.formUpdate.controls.sizes as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.formUpdate.controls.size_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }

  onCheckChangeSizes(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formUpdate.controls.size_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.size_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formUpdate.controls.size_id as FormArray).removeAt(i);
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
    return this.formUpdate.get('providers') as FormArray;
  }
  get provider_id(): FormArray {
    return this.formUpdate.get('provider_id') as FormArray;
  }

  private checkboxproviders() {
    this.providersList.forEach((o) => {
      let selected = false;
      if (this.producto.providers.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.formUpdate.controls.providers as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.formUpdate.controls.provider_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }

  onCheckChangeProviders(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formUpdate.controls.provider_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.provider_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formUpdate.controls.provider_id as FormArray).removeAt(i);
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
    return this.formUpdate.get('storages') as FormArray;
  }
  get storage_id(): FormArray {
    return this.formUpdate.get('storage_id') as FormArray;
  }

  private checkboxstorages() {
    this.storagesList.forEach((o) => {
      let selected = false;
      if (this.producto.storages.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.formUpdate.controls.storages as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.formUpdate.controls.storage_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }

  onCheckChangeStorages(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formUpdate.controls.storage_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.storage_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formUpdate.controls.storage_id as FormArray).removeAt(i);
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
      this.formUpdate.get('image').setValue(file);
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
    formData = this.gService.toFormData(this.formUpdate.value);
    formData.append('_method', 'PATCH');
    this.gService
      .update_formdata('seedfit', formData)
      .subscribe((respuesta: any) => {
        this.producto = respuesta;
        this.router.navigate(['/producto/all'], {
          queryParams: { update: 'true' },
        });
      });
  }
  onReset() {
    this.formUpdate.reset();
  }
  onBack() {
    this.router.navigate(['/producto/all']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formUpdate.controls[control].hasError(error) &&
      this.formUpdate.controls[control].invalid &&
      (this.makeSubmit || this.formUpdate.controls[control].touched)
    );
  };


}

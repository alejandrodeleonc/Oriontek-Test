import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import * as _ from 'lodash';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit {

  form: FormGroup;
  cols = [{field:'id'}, {field:'nombre'}, {field:'direccion'}];
  buttonTitle = "Agregar"
  facturas : any = [

  ];
  constructor(private fb: FormBuilder,) {
    this.form=this.fb.group({
      id: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      const obj: any = {id: i + 1, nombre: "Alejandro", direccion: "Calle 7"};
      this.facturas.push(obj);
    }


  }


  delete(data:any ){
    console.log('data ->', data)
    const i = this.facturas.indexOf(data) ;
    if(i !== -1){
      this.facturas.splice( i, 1 );
    }
  }

  agregar(data?:any){
    const controls: any = this.form.controls;

    const obj = {
      id: controls.id.value,
      nombre: controls.nombre.value,
      direccion: controls.direccion.value
    }
    if(data){
      const i = this.facturas.indexOf(data) ;
      this.facturas[i].id = obj.id;
      this.facturas[i].nombre = obj.nombre;
      this.facturas[i].direccion = obj.direccion;

    }else{
      this.facturas.push(obj);
    }

  }

  clear(){
    this.form.reset();
  }

  ver(data:any){
    const controls: any = this.form.controls;

    controls.id.setValue(data.id);
    controls.nombre.setValue(data.nombre);
    controls.direccion.setValue(data.direccion);

  }

  editar(data: any){
    this.ver(data);

    this.buttonTitle = 'Editar'

    this.agregar(data)
  }

}


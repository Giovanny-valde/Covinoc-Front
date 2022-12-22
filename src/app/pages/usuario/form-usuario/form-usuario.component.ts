import { Usuario } from 'src/app/_model/usuario.interface';
import { UsuarioService } from '../../../_service/usuario.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  idUsuario : number = 0
  
  localStorage = localStorage
  form!: FormGroup;
  usuarios!: Usuario[];
  usuario!: Usuario;

  constructor(
    private _usuarioService: UsuarioService,
    private _formBuilder: FormBuilder,
    public _activeModal: NgbActiveModal,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  emptyForm() {
    this.form = this._formBuilder.group({
      identification: [null, [Validators.required ]],
      phone: [null, []],
      userName: [null, [Validators.required ]]
    });
  }

  editForm() {
    this._usuarioService.getItemById(this.idUsuario.toString()).subscribe((data: Usuario) => {
      this.usuario = data
      this.form = this._formBuilder.group({
        id : [data.id],
        identification: [data.identification, [Validators.required ]],
        phone: [data.phone, []],
        userName: [data.userName, [Validators.required]]
      });
    })
  }

  initForm() {
    this.emptyForm();
    if (this.idUsuario > 0) {
      this.editForm();
    }
  }

  operate() {
    let rawValuesForm = this.form.getRawValue();

    let usuario: Usuario = {
      ...rawValuesForm
    }

    if (this.usuario) {
      this._usuarioService.updateItem(usuario ,usuario.id).subscribe(data => {
      this.toastrMenssage('Actualizado Exitosamente', 'success')
        this.closeModal();
      });
    } else {
      this._usuarioService.saveItem(usuario).subscribe(data => {
        this.toastrMenssage('Guardado Exitosamente', 'success')
        this.closeModal();
      });
    }
  }

  closeModal() {
    this._activeModal.close();
  }

  toastrMenssage(Mensage : string , estado : "error" | "success"){
    if(estado ==  "success") {
      this.toastr.success( `${Mensage}` , 'Mensaje del sistema!',{
        positionClass: 'toast-bottom-right',
      });
    }else{
      this.toastr.error( `Ocurrio un error` , 'Mensaje del sistema!',{
        positionClass: 'toast-bottom-right',
      });
    }
  }



}

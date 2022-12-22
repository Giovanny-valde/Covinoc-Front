import { startWith, map, debounceTime } from 'rxjs/operators';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { Observable } from 'rxjs';
import { Usuario } from '../../_model/usuario.interface';
import { UsuarioService } from '../../_service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios!: Usuario[];
  usuario!: Usuario;
  form!: FormGroup;
  usuarios$!: Observable<Usuario[]>;
  filter: FormControl = new FormControl("");

  constructor(
    private _usuarioService: UsuarioService,
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.getUsuarios()
  }
  
  openModal( id?: number) {
    let modal = this._modalService.open(FormUsuarioComponent)
    modal.componentInstance.idUsuario = id

    modal.result.then(
      () => {
        this.getUsuarios()
      }
    )
  }

  eliminar(id: number) {
      Swal.fire({
        title: '¿Está seguro de realizar esta acción?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F8E12E',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminelo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
          this._usuarioService.deleteItem((id)).subscribe(data => {
              this.toastrMenssage('Eliminado Exitosamente', 'success')
              this.getUsuarios()
          })
        }
    })
  }

  getUsuarios() {
    // this.spinner.show();
    this._usuarioService.getItems().subscribe(data => {
      this.usuarios = data
      this.toastrMenssage('Usuarios obtenidos Exitosamente', 'success')
      // this.spinner.hide();
      this.tableFilter();
    });
  }

  tableFilter() {
    this.usuarios$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    )
  }

  search(text: string): Usuario[] {
    return this.usuarios.filter(val => {
      const term = text.toLowerCase();
      return val.phone.toString().includes(term) ||
      val.identification.includes(term) ||
      val.userName.toLowerCase().includes(term) 
    });
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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { PagesRoutingModule } from './pages-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormUsuarioComponent } from './usuario/form-usuario/form-usuario.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    DashBoardComponent,
    UsuarioComponent,
    UsuarioComponent,
    FormUsuarioComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
  ]
})
export class PagesModule { }

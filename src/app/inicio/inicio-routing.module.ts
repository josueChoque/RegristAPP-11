import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';
import {UsuarioComponent } from '../usuario/usuario.component'
const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    children:[{
      path:'usuario',
      component:UsuarioComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}

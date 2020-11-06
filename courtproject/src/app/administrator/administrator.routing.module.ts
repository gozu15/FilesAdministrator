import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator.component';
import { AsistenteLeyesComponent } from './asistente-leyes/asistente-leyes.component';
import { CaratulasComponent } from './caratulas/caratulas.component';
import { InicioComponent } from './inicio/inicio.component';
import { LibrosDiariosComponent } from './libros-diarios/libros-diarios.component';
import { AuthGuard } from '../auth/helpers/auth.guard';
const routes : Routes=[
  {path:'', component:AdministratorComponent,
    children:[
      {path:'inicio', component:InicioComponent},
      {path:'asistente_leyes', component:AsistenteLeyesComponent},
      {path:'caratulas', component:CaratulasComponent},
      {path:'libros', component:LibrosDiariosComponent},
      {path:'', redirectTo:'/administrator/inicio', pathMatch:'full'}

    ]
  }  ,
  {path:'', redirectTo:'/', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule{}

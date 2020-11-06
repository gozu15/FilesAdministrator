import { NgModule } from '@angular/core';

import { AdministratorRoutingModule } from './administrator.routing.module';
import { BrowserModule } from '@angular/platform-browser'

import {MatMenuModule} from '@angular/material/menu'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatListModule} from '@angular/material/list'
import {MatButtonModule} from '@angular/material/button';


import { AdministratorComponent } from './administrator.component';
import { InicioComponent } from './inicio/inicio.component';
import {MaterialAngularModule} from '../material.angular.module';
import { CaratulasComponent } from './caratulas/caratulas.component'
import {AsistenteLeyesComponent} from './asistente-leyes/asistente-leyes.component';
import { LibrosDiariosComponent } from './libros-diarios/libros-diarios.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations:[
    AdministratorComponent,
    InicioComponent,
    CaratulasComponent,
    AsistenteLeyesComponent,
    LibrosDiariosComponent
  ],
  imports:[
    CommonModule,
    AdministratorRoutingModule,
    MaterialAngularModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule

  ],
  providers: [],
})
export class AdministratorModule{ }

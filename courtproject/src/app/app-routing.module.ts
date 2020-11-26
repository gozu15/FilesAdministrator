import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {path:'home', component:HomeComponent},
  //{path:'administrator', component:AdministratorComponent},//canActivate: [AuthGuard]
  {path:'administrator', loadChildren: () => import ('./administrator/administrator.module' ).then(mod => mod.AdministratorModule)},
  {path:'authentication', component:AuthComponent},
  {path:'' ,redirectTo:'/authentication', pathMatch:'full'},
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

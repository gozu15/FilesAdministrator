import { Component } from '@angular/core';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent {
 links=[
    {
      name: "Inicio",
      url: "/administrator"
    },
    {
      name: "Asistente de leyes",
      url: "/administrator/asistente_leyes"
    },
    {
      name: "Caratulas",
      url: "/administrator/caratulas"
    },
     {
      name: "Libros diarios",
      url: "/administrator/libros"
    }
  ]

}

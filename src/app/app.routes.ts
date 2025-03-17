import { Routes } from '@angular/router';
import { PATH } from './core/enum/path.enum';
import { InicioComponent } from './pages/inicio/inicio.component';

export const routes: Routes = [
  {
    path: PATH.HOME,
    title: 'Inicio',
    children: [
      {
        path: PATH.INICIO,
        title: 'Inicio',
        component: InicioComponent,
      },
    ],
  },
];

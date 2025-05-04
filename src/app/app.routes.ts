import { Routes } from "@angular/router";
import { PATH } from "./core/enum/path.enum";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { ProductsComponent } from "./pages/productos/products.component";
import { ViewProductsComponent } from "./pages/view-products/view-products.component";

export const routes: Routes = [
  {
    path: PATH.HOME,
    title: "Inicio",
    children: [
      {
        path: PATH.INICIO,
        title: "Inicio",
        component: InicioComponent,
      },
      {
        path: PATH.PRODUCTOS,
        title: "Productos",
        component: ProductsComponent,
      },
      {
        path: PATH.PRODUCTOS_ID,
        title: "Detalles del Producto",
        component: ViewProductsComponent,
      },
    ],
  },
];

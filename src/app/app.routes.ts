import { Routes } from "@angular/router";
import { PATH } from "./core/enum/path.enum";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { ProductsComponent } from "./pages/productos/products.component";
import { ProductDetailComponent } from "./pages/view-product/view-product.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { AdminProductComponent } from "./pages/create-product/create-product.component";

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
        component: ProductDetailComponent,
      },
      {
        path: PATH.LOGIN,
        title: "Iniciar Sesión",
        component: LoginComponent,
      },
      {
        path: PATH.REGISTRO,
        title: "Registro",
        component: RegisterComponent,
      },
      {
        path: PATH.CREARPRODUCTOS,
        title: "Crear Producto",
        component: AdminProductComponent,
      },
    ],
  },
];

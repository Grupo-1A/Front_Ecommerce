import { Component } from '@angular/core';
import { CarritoService } from '../pages/productos/carrito.service';

Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public carritoService: CarritoService) {}
}

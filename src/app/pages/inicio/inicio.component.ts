import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NgFor, CurrencyPipe, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  products = [
    { name: 'Audífonos', price: 0, image: 'product1.jpg' },
    { name: 'Portatil', price: 0, image: 'product2.jpg' },
    { name: 'Casco', price: 0, image: 'product3.jpg' },
    { name: 'Guitarra', price: 0, image: 'product4.jpg' },
  ];
}

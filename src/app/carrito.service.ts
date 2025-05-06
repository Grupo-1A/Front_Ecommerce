import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  sizes: string[];
  condition: string;
  location: string;
  discount?: number;
  shipping?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);

  cart$ = this.cartSubject.asObservable(); // Exponemos el carrito como observable

  addToCart(product: Product): void {
    this.cart.push(product);
    this.cartSubject.next(this.cart);
  }

  removeFromCart(product: Product): void {
    this.cart = this.cart.filter(p => p !== product);
    this.cartSubject.next(this.cart);
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }
}

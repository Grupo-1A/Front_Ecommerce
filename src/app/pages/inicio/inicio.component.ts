import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { PATH } from "../../core/enum/path.enum";
import { CommonModule } from "@angular/common";
import { NgFor, CurrencyPipe } from "@angular/common";
import { NavbarComponent } from '../../header/navbar/navbar.component';
import { FooterComponent } from '../../footer/footer/footer.component';

@Component({
  selector: "app-inicio",
  standalone: true,
  imports: [NgFor, CurrencyPipe, CommonModule,NavbarComponent,FooterComponent],
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"],
})
export class InicioComponent {
  products = [
    { name: "Audífonos", price: 0, image: "product1.jpg" },
    { name: "Portatil", price: 0, image: "product2.jpg" },
    { name: "Casco", price: 0, image: "product3.jpg" },
    { name: "Guitarra", price: 0, image: "product4.jpg" },
  ];

  constructor(private router: Router) {}

  navigateToProducts(): void {
    this.router.navigate([PATH.HOME, PATH.PRODUCTOS]);
  }
}

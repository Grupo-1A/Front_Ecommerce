import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Product } from "../../interfaces/product.interface";

@Component({
  selector: "app-product-list",
  templateUrl: "../view-product/view-product.component.html",
})
export class ProductListComponent implements OnInit {
  productos: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => console.error("Error cargando productos:", err),
    });
  }
}

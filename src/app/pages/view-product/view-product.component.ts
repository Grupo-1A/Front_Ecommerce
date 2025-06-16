import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../interfaces/product.interface";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-product-detail",
  templateUrl: "../view-product/view-product.component.html",
  styleUrls: ["../view-product/view-product.component.css"],
  imports: [CommonModule],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get("id");
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          console.log("Producto recibido: ", data);
          this.product = data.producto;
        },
        error: (err) => {
          console.error("Error al obtener el producto:", err);
        },
      });
    }
  }
  goBack() {
    window.history.back();
  }
}

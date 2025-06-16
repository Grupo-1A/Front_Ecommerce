import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../interfaces/product.interface";

@Component({
  selector: "app-product-detail",
  templateUrl: "../view-product/view-product.component.html",
  styleUrls: ["../view-product/view-product.component.css"],
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
        next: (product) => (this.product = product),
        error: (err) => console.error("Error al cargar producto", err),
      });
    }
  }

  goBack() {
    window.history.back();
  }
}

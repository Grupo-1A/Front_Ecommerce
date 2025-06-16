import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { NavbarComponent } from "../../header/navbar/navbar.component";
import { FooterComponent } from "../../footer/footer/footer.component";
import { ProductService } from "../../services/product.service";
import { Product } from "../../interfaces/product.interface";
import { PATH } from "../../core/enum/path.enum";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
  ],
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];

  filters = {
    category: "",
    brand: "",
    minPrice: 0,
    maxPrice: 1000000,
    sizes: [] as string[],
    condition: "",
    location: "",
    discount: 0,
    sort: "",
    shipping: "",
  };

  searchTerm: string = "";
  favorites: Set<string> = new Set(); // Con _id ahora
  cart: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((productos) => {
      this.allProducts = productos;
      this.filteredProducts = [...productos];
    });
  }

  navigateToProduct(productId: string): void {
    this.router
      .navigate(["producto", productId])
      .catch((err) => console.error("Error en la navegación:", err));
  }

  toggleFavorite(product: Product, event: Event): void {
    event.stopPropagation();
    if (this.favorites.has(product._id)) {
      this.favorites.delete(product._id);
    } else {
      this.favorites.add(product._id);
    }
  }

  addToCart(product: Product, event: Event): void {
    event.stopPropagation();
    console.log("Producto agregado al carrito:", product);
    // lógica del carrito
  }

  applyFilters(): void {
    this.filteredProducts = this.allProducts.filter((product) => {
      if (
        this.searchTerm &&
        !product.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      ) {
        return false;
      }

      if (
        this.filters.category &&
        product.categoria !== this.filters.category
      ) {
        return false;
      }

      if (this.filters.brand && product.marca !== this.filters.brand) {
        return false;
      }

      if (
        product.precio < this.filters.minPrice ||
        product.precio > this.filters.maxPrice
      ) {
        return false;
      }

      return true;
    });

    this.sortProducts();
  }

  sortProducts(): void {
    switch (this.filters.sort) {
      case "precio-bajo":
        this.filteredProducts.sort((a, b) => a.precio - b.precio);
        break;
      case "precio-alto":
        this.filteredProducts.sort((a, b) => b.precio - a.precio);
        break;
      case "nombre":
        this.filteredProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
    }
  }

  resetFilters(): void {
    this.filters = {
      category: "",
      brand: "",
      minPrice: 0,
      maxPrice: 1000000,
      sizes: [],
      condition: "",
      location: "",
      discount: 0,
      sort: "",
      shipping: "",
    };
    this.searchTerm = "";
    this.filteredProducts = [...this.allProducts];
  }

  setPrice(min: number, max: number): void {
    this.filters.minPrice = min;
    this.filters.maxPrice = max;
  }

  onSizeChange(size: string, event: any): void {
    if (event.target.checked) {
      this.filters.sizes.push(size);
    } else {
      this.filters.sizes = this.filters.sizes.filter((s) => s !== size);
    }
  }
}

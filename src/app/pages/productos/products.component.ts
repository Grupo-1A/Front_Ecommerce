import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { PATH } from "../../core/enum/path.enum";

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

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [
    {
      id: 1,
      name: "Camiseta Básica Negra",
      price: 49900,
      image: "assets/images/camiseta-negra.jpg",
      category: "ropa",
      brand: "Nike",
      sizes: ["S", "M", "L"],
      condition: "nuevo",
      location: "bogota",
      discount: 0,
      shipping: "gratis",
    },
    {
      id: 2,
      name: "Tenis Deportivos",
      price: 189900,
      image: "assets/images/tenis.jpg",
      category: "calzado",
      brand: "Adidas",
      sizes: ["38", "39", "40", "41", "42"],
      condition: "nuevo",
      location: "medellin",
      discount: 10,
      shipping: "pago",
    },
    {
      id: 3,
      name: "Reloj Casual",
      price: 299900,
      image: "assets/images/reloj.jpg",
      category: "accesorios",
      brand: "Casio",
      sizes: ["UNICO"],
      condition: "nuevo",
      location: "bogota",
      discount: 5,
      shipping: "gratis",
    },
    {
      id: 4,
      name: "Jeans Clásicos",
      price: 159900,
      image: "assets/images/jeans.jpg",
      category: "ropa",
      brand: "Levis",
      sizes: ["28", "30", "32", "34", "36"],
      condition: "nuevo",
      location: "cali",
      discount: 0,
      shipping: "pago",
    },
    {
      id: 5,
      name: "Gorra Nike",
      price: 89900,
      image: "assets/images/gorra.jpg",
      category: "accesorios",
      brand: "Nike",
      sizes: ["S/M", "L/XL"],
      condition: "nuevo",
      location: "bogota",
      discount: 15,
      shipping: "gratis",
    },
    {
      id: 6,
      name: "Chaqueta de Cuero",
      price: 450000,
      image: "assets/images/chaqueta.jpg",
      category: "ropa",
      brand: "Zara",
      sizes: ["S", "M", "L", "XL"],
      condition: "nuevo",
      location: "medellin",
      discount: 0,
      shipping: "pago",
    },
    {
      id: 7,
      name: "Bufanda de Lana",
      price: 79900,
      image: "assets/images/bufanda.jpg",
      category: "accesorios",
      brand: "H&M",
      sizes: ["UNICO"],
      condition: "nuevo",
      location: "bogota",
      discount: 20,
      shipping: "gratis",
    },
    {
      id: 8,
      name: "Botas de Montaña",
      price: 289900,
      image: "assets/images/botas.jpg",
      category: "calzado",
      brand: "Timberland",
      sizes: ["37", "38", "39", "40", "41", "42"],
      condition: "nuevo",
      location: "cali",
      discount: 0,
      shipping: "pago",
    },
    {
      id: 9,
      name: "Vestido Elegante",
      price: 199900,
      image: "assets/images/vestido.jpg",
      category: "ropa",
      brand: "Forever 21",
      sizes: ["XS", "S", "M", "L"],
      condition: "nuevo",
      location: "bogota",
      discount: 10,
      shipping: "gratis",
    },
    {
      id: 10,
      name: "Mochila Viajera",
      price: 159900,
      image: "assets/images/mochila.jpg",
      category: "accesorios",
      brand: "Samsonite",
      sizes: ["UNICO"],
      condition: "nuevo",
      location: "medellin",
      discount: 5,
      shipping: "pago",
    },
  ];

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
    shipping: "", // Añadida la propiedad shipping
  };

  searchTerm: string = "";
  favorites: Set<number> = new Set(); // Para manejar favoritos

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredProducts = [...this.allProducts];
  }

  navigateToProduct(productId: number): void {
    this.router
      .navigate(["producto", productId.toString()])
      .then(() => {
        console.log("Navegando al producto:", productId);
      })
      .catch((err) => {
        console.error("Error en la navegación:", err);
      });
  }

  navigateToProducts(productId?: number): void {
    if (productId) {
      this.router
        .navigate([PATH.PRODUCTOS, productId])
        .then(() => {
          console.log("Navegando al producto:", productId);
        })
        .catch((err) => {
          console.error("Error en la navegación:", err);
        });
    }
  }

  // Método para manejar favoritos
  toggleFavorite(product: Product, event: Event): void {
    event.stopPropagation(); // Evita que el clic se propague
    if (this.favorites.has(product.id)) {
      this.favorites.delete(product.id);
    } else {
      this.favorites.add(product.id);
    }
  }

  // Método para agregar al carrito
  addToCart(product: Product, event: Event): void {
    event.stopPropagation(); // Evita que el clic se propague
    console.log("Producto agregado al carrito:", product);
    // lógica del carrito
  }

  applyFilters(): void {
    this.filteredProducts = this.allProducts.filter((product) => {
      // Filtro por búsqueda
      if (
        this.searchTerm &&
        !product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filtro por categoría
      if (this.filters.category && product.category !== this.filters.category) {
        return false;
      }

      // Filtro por marca
      if (this.filters.brand && product.brand !== this.filters.brand) {
        return false;
      }

      // Filtro por precio
      if (
        product.price < this.filters.minPrice ||
        product.price > this.filters.maxPrice
      ) {
        return false;
      }

      // Filtro por tallas
      if (
        this.filters.sizes.length > 0 &&
        !this.filters.sizes.some((size) => product.sizes.includes(size))
      ) {
        return false;
      }

      // Filtro por condición
      if (
        this.filters.condition &&
        product.condition !== this.filters.condition
      ) {
        return false;
      }

      // Filtro por ubicación
      if (this.filters.location && product.location !== this.filters.location) {
        return false;
      }

      // Filtro por descuento
      if (
        this.filters.discount > 0 &&
        (!product.discount || product.discount < this.filters.discount)
      ) {
        return false;
      }

      // Filtro por shipping
      if (this.filters.shipping && product.shipping !== this.filters.shipping) {
        return false;
      }

      return true;
    });

    // Aplicar ordenamiento
    this.sortProducts();
  }

  sortProducts(): void {
    switch (this.filters.sort) {
      case "precio-bajo":
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "precio-alto":
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "nombre":
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
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

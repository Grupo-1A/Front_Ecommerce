import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


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
  imports: [CommonModule, FormsModule],
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [
    {
      id: 1,
      name: "Diadema Sony Alambrico Blanco",
      price: 169900,
      image: "/AudífonosdeDiademaSonyAlámbricosOverEarGamingMDR-G300BlancoNegro.jpg",
      category: "tecnologia",
      brand: "Nike",
      sizes: ["S", "M", "L"],
      condition: "nuevo",
      location: "bogota",
      discount: 0,
      shipping: "gratis",
    },
    {
      id: 2,
      name: "Base Ventilador PC",
      price: 45900,
      image: "/imagenes/baseventiladorpc/BaseEnfriadoraXKIM5Posiciones2PuertosUSB2Ventiladores.jpg",
      category: "tecnologia",
      brand: "Adidas",
      sizes: ["38", "39", "40", "41", "42"],
      condition: "nuevo",
      location: "medellin",
      discount: 10,
      shipping: "pago",
    },
    {
      id: 3,
      name: "Bombillo Inteligente VGA",
      price: 99900,
      image: "imagenes/casaInteligente/KitNEXXTHogarInteligenteCámaradeSeguridadFijaWiFi2K2BombillosInteligentesLEDWiFi110VMulticolor.png",
      category: "CasaInteligente",
      brand: "",
      sizes: [""],
      condition: "nuevo",
      location: "bogota",
      discount: 5,
      shipping: "gratis",
    },
    {
      id: 4,
      name: "Camara seguridad exterior",
      price: 159900,
      image: "imagenes/camaraseguridad/CámaradeSeguridadExteriorIMOUCruiser2Wifi3K5MPVisiónDía.NocheconMovimiento.png",
      category: "CasaInteligente",
      brand: "Levis",
      sizes: ["28", "30", "32", "34", "36"],
      condition: "nuevo",
      location: "cali",
      discount: 0,
      shipping: "pago",
    },
    {
      id: 5,
      name: "Casco Bell ",
      price: 480000,
      image: "imagenes/cascosMoto/CascoMotoBELLBullittNegroTallaL.png",
      category: "accesoriosmotero",
      brand: "Nike",
      sizes: ["S/M", "L/XL"],
      condition: "nuevo",
      location: "bogota",
      discount: 15,
      shipping: "gratis",
    },
    {
      id: 6,
      name: "casco spartan hawk",
      price: 500000,
      image: "imagenes/cascosMoto/cascoMotoSPARTANHawkSVTitanNegroRojoMateTallaM.png",
      category: "accesoriosmotero",
      brand: "Spartan",
      sizes: ["S", "M", "L", "XL"],
      condition: "nuevo",
      location: "medellin",
      discount: 0,
      shipping: "pago",
    },
    {
      id: 7,
      name: "Play Station 5 + control + dos juegos ",
      price: 2650000,
      image: "imagenes/consolas/ps5.png",
      category: "Consolaa",
      brand: "H&M",
      sizes: ["UNICO"],
      condition: "nuevo",
      location: "bogota",
      discount: 20,
      shipping: "gratis",
    },
    {
      id: 8,
      name: "Nintendo Switch OLED",
      price: 1299000,
      image: "imagenes/consolas/nintendoswitch.png",
      category: "Consolaa",
      brand: "Timberland",
      sizes: ["37", "38", "39", "40", "41", "42"],
      condition: "nuevo",
      location: "bogota",
      discount: 0,
      shipping: "pago",
    },
    {
      id: 9,
      name: "secadora lavadora",
      price: 4999000,
      image: "imagenes/electrodomesticos/secadoraLavadora.png",
      category: "electrodomestico",
      brand: "Forever 21",
      sizes: ["XS", "S", "M", "L"],
      condition: "nuevo",
      location: "bogota",
      discount: 10,
      shipping: "gratis",
    },
    {
      id: 10,
      name: "armario",
      price: 980000,
      image: "imagenes/hogar/armario.png",
      category: "Hogar",
      brand: "Samsonite",
      sizes: ["UNICO"],
      condition: "nuevo",
      location: "medellin",
      discount: 5,
      shipping: "pago",
    },
    {
      id: 11,
      name: "sofa",
      price: 599000,
      image: "imagenes/hogar/sofa.png",
      category: "Hogar",
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

  ngOnInit() {
    this.filteredProducts = [...this.allProducts];
  }

  // Método para manejar favoritos
  toggleFavorite(product: Product): void {
    if (this.favorites.has(product.id)) {
      this.favorites.delete(product.id);
    } else {
      this.favorites.add(product.id);
    }
  }
  cart: Product[] = [];

  // Método para agregar al carrito
  addToCart(product: Product): void {
    this.cart.push(product);
    console.log("Producto agregado al carrito:", product);
    // Aquí implementarías la lógica del carrito
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

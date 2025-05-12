import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavbarComponent } from '../../header/navbar/navbar.component';
import { FooterComponent } from '../../footer/footer/footer.component';

interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

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
  shipping: string;
  description: string;
  specifications: { [key: string]: string };
  reviews: Review[];
  relatedProducts: number[];
  stock: number;
  colors?: { name: string; value: string }[];
}

@Component({
  selector: "app-view-products",
  templateUrl: "./view-products.component.html",
  styleUrls: ["./view-products.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent],
})
export class ViewProductsComponent implements OnInit {
  product: Product | null = null;
  selectedSize: string = "";
  selectedColor: string = "";
  quantity: number = 1;
  activeTab: "description" | "specifications" | "reviews" = "description";
  userRating: number = 0;
  userReview: string = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get("id");
    this.loadProductDetails(productId);
  }

  loadProductDetails(productId: string | null) {
    this.product = {
      id: 1,
      name: "Camiseta Básica Negra",
      price: 49900,
      image: "product4.jpg",
      category: "ropa",
      brand: "Nike",
      sizes: ["S", "M", "L"],
      condition: "nuevo",
      location: "Bogotá",
      discount: 15,
      shipping: "gratis",
      description:
        "Camiseta básica de algodón premium, perfecta para cualquier ocasión...",
      specifications: {
        Material: "100% Algodón",
        "Tipo de cuello": "Redondo",
        Cuidados: "Lavado a máquina",
        "País de origen": "Colombia",
      },
      reviews: [
        {
          id: 1,
          userId: 1,
          userName: "Juan Pérez",
          rating: 5,
          comment: "Excelente calidad, muy cómoda",
          date: new Date("2024-01-15"),
        },
      ],
      relatedProducts: [2, 3, 4],
      stock: 10,
      colors: [
        { name: "negro", value: "#000000" },
        { name: "blanco", value: "#FFFFFF" },
        { name: "gris", value: "#808080" },
      ],
    };
  }

  addToCart() {
    if (!this.selectedSize || !this.product) {
      alert("Por favor selecciona una talla");
      return;
    }

    const cartItem = {
      productId: this.product.id,
      name: this.product.name,
      price: this.product.price,
      size: this.selectedSize,
      color: this.selectedColor,
      quantity: this.quantity,
    };

    console.log("Agregado al carrito:", cartItem);
  }

  submitReview() {
    if (!this.userRating || !this.userReview) {
      alert("Por favor completa tu reseña");
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      userId: 1,
      userName: "Usuario Actual",
      rating: this.userRating,
      comment: this.userReview,
      date: new Date(),
    };

    this.product?.reviews.push(newReview);
    this.userRating = 0;
    this.userReview = "";
  }

  updateQuantity(increment: boolean) {
    if (increment && this.product && this.quantity < this.product.stock) {
      this.quantity++;
    } else if (!increment && this.quantity > 1) {
      this.quantity--;
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { Category } from "../../interfaces/product.interface";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ["", []],
      brand: ["", [Validators.required]],
      imageUrl: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error("Error loading categories:", error);
        this.error = "Error al cargar las categorías";
      },
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.isLoading = true;
      this.productService.createProduct(this.productForm.value).subscribe({
        next: () => {
          this.router.navigate(["/products"]);
        },
        error: (error) => {
          console.error("Error creating product:", error);
          this.error = "Error al crear el producto";
          this.isLoading = false;
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(["/products"]);
  }
}

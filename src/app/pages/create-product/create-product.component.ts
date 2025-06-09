import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { OnInit } from "@angular/core";

interface Category {
  id: string;
  name: string;
}

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AdminProductComponent implements OnInit {
  productForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  products: any[] = [];
  isEditing = false;
  editingId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoria: ["", Validators.required],
      marca: ["", Validators.required],
      imageUrl: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log("Productos recibidos:", data);
        this.products = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSubmit(): void {
    const formValue = this.productForm.value;
    const categoryName =
      this.categories.find((cat) => cat.id === formValue.categoria)?.name || "";

    const productData = {
      ...formValue,
      precio: Number(formValue.precio),
      stock: Number(formValue.stock),
      categoria: categoryName,
    };

    if (this.isEditing && this.editingId) {
      this.productService
        .updateProduct(this.editingId, productData)
        .subscribe(() => {
          this.getAllProducts();
          this.resetForm();
        });
    } else {
      this.productService.createProduct(productData).subscribe(() => {
        this.getAllProducts();
        this.productForm.reset();
      });
    }
  }

  editProduct(product: any): void {
    this.isEditing = true;
    this.editingId = product._id;

    const category = this.categories.find(
      (cat) => cat.name === product.categoria
    );

    this.productForm.patchValue({
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      stock: product.stock,
      categoria: category?.id || "",
      marca: product.marca,
      imageUrl: product.imageUrl,
    });
  }

  categories: Category[] = [
    { id: "1", name: "Electrónicos" },
    { id: "2", name: "Ropa" },
    { id: "3", name: "Hogar" },
    { id: "4", name: "Deportes" },
    { id: "5", name: "Juguetes" },
    { id: "6", name: "Libros" },
    { id: "7", name: "Belleza" },
    { id: "8", name: "Alimentos" },
  ];

  deleteProduct(id: string): void {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.getAllProducts();
      });
    }
  }

  onCancel(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.productForm.reset();
    this.isEditing = false;
    this.editingId = null;
  }
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductService } from "../../services/product.service";

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
  selectedImage!: File;

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
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
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

  getAllProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid || !this.selectedImage) {
      alert("Formulario incompleto o imagen no seleccionada.");
      return;
    }

    const formValue = this.productForm.value;
    const categoryName =
      this.categories.find((cat) => cat.id === formValue.categoria)?.name || "";

    const formData = new FormData();
    formData.append("nombre", formValue.nombre);
    formData.append("descripcion", formValue.descripcion);
    formData.append("precio", formValue.precio);
    formData.append("stock", formValue.stock);
    formData.append("categoria", categoryName);
    formData.append("marca", formValue.marca);
    formData.append("imagen", this.selectedImage); // clave esperada por multer

    if (this.isEditing && this.editingId) {
      this.productService
        .updateProductFormData(this.editingId, formData)
        .subscribe(() => {
          this.getAllProducts();
          this.resetForm();
        });
    } else {
      this.productService.createProduct(formData).subscribe(() => {
        this.getAllProducts();
        this.resetForm();
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
    });

    // Nota: No puedes volver a cargar la imagen aquí (por seguridad del navegador)
    // El usuario debe volver a seleccionarla si quiere cambiarla
  }

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
    this.selectedImage = undefined!;
  }
}

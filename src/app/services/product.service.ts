import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product, Category } from "../interfaces/product.interface";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this.http
      .get<{ ok: boolean; productos: Product[] }>(`${this.apiUrl}/productos`)
      .pipe(map((response) => response.productos));
  }

  // Obtener un producto por ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/productos/${id}`);
  }

  // Crear un nuevo producto con imagen (FormData)
  createProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/productos`, formData);
  }

  // Actualizar producto con FormData (por ejemplo cuando se cambia la imagen)
  updateProductFormData(id: string, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/productos/${id}`, formData);
  }

  // Eliminar un producto
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/productos/${id}`);
  }

  // Obtener categorías
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
}

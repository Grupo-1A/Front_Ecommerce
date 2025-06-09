import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product, Category } from "../interfaces/product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/productos`);
  }

  // Obtener un producto por ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/productos/${id}`);
  }

  // Crear un nuevo producto (se usa un any para que no sea necesario el _id)
  createProduct(product: any): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/productos`, product);
  }

  // Actualizar un producto
  updateProduct(id: string, product: any): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/productos/${id}`, product);
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

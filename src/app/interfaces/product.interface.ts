export interface Product {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  marca: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
}

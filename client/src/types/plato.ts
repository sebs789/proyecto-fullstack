export const CATEGORIAS = ['Entradas', 'Fondos', 'Postres', 'Bebidas'] as const
export type Categoria = (typeof CATEGORIAS)[number]


export interface Plato {
  id: string
  nombre: string
  categoria: Categoria
  descripcion: string
  precio: number
  tiempo_preparacion: number
  imagen: string
}


export interface PlatoFormulario {
  nombre: string
  categoria: string
  descripcion: string
  precio: string
  tiempo_preparacion: string
  imagen: string
}

// Lo que se envía a la API al crear o editar
export interface PlatoInput {
  nombre: string
  categoria: Categoria
  descripcion: string
  precio: number
  tiempo_preparacion: number
  imagen: string
}

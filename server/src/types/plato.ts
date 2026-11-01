
export const CATEGORIAS = ['Entradas', 'Fondos', 'Postres', 'Bebidas'] as const;
export type Categoria = (typeof CATEGORIAS)[number];


export interface PlatoInput {
    nombre: string;
    categoria: Categoria;
    descripcion: string;
    precio: number;
    tiempo_preparacion: number;
    imagen: string;
}

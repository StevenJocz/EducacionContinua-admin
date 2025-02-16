export interface CursoInscripion {
    id: number;
    titulo: string;
    imagen: string;
    instructor: string;
    precio: number;
    impuesto: number;
    descuento: number;
}


export interface Cupon {
    id: number;
    idCurso: number;
    nombre: string; 
    codigo: string;
    descuento: number;
    valido: boolean;
    mensaje: string; 
}
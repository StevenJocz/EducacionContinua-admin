export interface InformacionCurso {
    id: number
    titulo: string;
    descripcion: string;
    dependencia: string;
    categorias: categoriaCurso[];
    imagen: string;
    dirigido: string;
    aprendera: string[];
}

export interface categoriaCurso {
    id: number
    nombre: string;
}
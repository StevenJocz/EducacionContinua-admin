export interface ListCurso {
    id: number;
    codigo: string;
    titulo: string;
    imagen: string;
    estado: string
    cursoCategorias: categoriaCurso[],
    dependencia: string;
    temario: boolean;
    recursos: boolean;
    grupos: boolean;
    cupones: boolean;
}

export interface categoriaCurso {
    id: number
    nombre: string;
}

export const Imagen ={
    URL: "http://localhost:5059/"
}




export interface Tema {
    id: number;
    titulo: string;
}

export interface Modulo {
    id: number;
    idCurso: number;
    titulo: string;
    descripcion: string;
    temas: Tema[];
    idQuiz: number;
}

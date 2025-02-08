
export interface Tema {
    id: number;
    titulo: string;
    videoUrl: string;
    descripcion: string;
    tiempoAporbar: number;
    aprobado: boolean;
}

export interface Quiz {
    id: number;
    titulo: string;
    descripcion: string;
    realizado: boolean;
    calificacion: number;
    preguntas: Pregunta[];
}

export interface Pregunta {
    id: number;
    texto: string;
    opciones: Opcion[];
}

export interface Opcion {
    id: number;
    texto: string;
    correcta: boolean;
}

export interface Modulo {
    id: number;
    nombre: string;
    temas: Tema[];
    quizz: Quiz[];
    aprobado: boolean;
    visible: boolean;
}

export interface Instructor {
    id: number;
    nombre: string;
    titulo: string;
    descripcion: string;
    foto: string;
}


export interface ObjectoCurso {
    id: number;
    grupo: number;
    titulo: string;
    descripcion: string;
    progreso: number;
    instructor: Instructor[];
    drive: string;
    modulos: Modulo[];
    aprobado: boolean;
    finalizado: boolean;
}

export interface Respuesta {
    id: number;
    texto: string;
    esCorrecta: boolean;
}

export interface Pregunta {
    id: number;
    texto: string;
    respuestas: Respuesta[];
}

export interface QuizObjecto {
    idQuizz: number;
    idModulo: number;
    titulo: string;
    descripcion: string;
    preguntas: Pregunta[];
}
export interface Usuario {
    nombre: string;
    rol: string;
    avatar: string;
}

export interface Respuesta {
    id: number;
    usuario: Usuario;
    fecha: string;
    texto: string;
    likes: number;
}

export interface Comentario {
    id: number;
    idGrupo: number;
    usuario: Usuario;
    fecha: string;
    texto: string;
    likes: number;
    respuestas: Respuesta[];
}
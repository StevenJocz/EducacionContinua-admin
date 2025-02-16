export interface GrupoModel {
    id: number;
    nombre: string;
    idProfesor: number;
    profesor: string;
    foto: string;
    fechaInicio:  Date;
    fechaFin:  Date;
    precio: string;
    estado: boolean;
}

export interface ProfesorModel {
    id: number;
    nombre: string;
    foto: string;
}
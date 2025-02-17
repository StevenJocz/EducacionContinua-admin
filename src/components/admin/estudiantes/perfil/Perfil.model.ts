export interface EstudianteModel {
    id: number;
    imagen: string;
    correo: string;
    apellidos: string;
    nombres: string;
    tipoDocumento: string;
    documento: string;
    celular: string;
    genero: string;
    pais: string;
    departamento: string;
    ciudad: string;
    tipoVia: string;
    numero1: string;
    numero2: string;
    numero3: string;
}


export interface CursoModel {
    id: number;
    imagen: string;
    titulo: string;
    codigo: string;
    progreso: number; 
}


export interface CertificadoModel {
    id: number;
    titulo: string;
    imagen: string;
    urlDescarga: string;
}

export interface InformacionEstudiante{
    id: number;
    estudiante: EstudianteModel;
    cursos: CursoModel[];
    certificados: CertificadoModel[];
}
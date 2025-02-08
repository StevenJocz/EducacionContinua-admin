export interface WidgetInscripciones {
    id: number;
    nombre: string;
    inscripciones: number;
}

export interface WidgetCursos {
    id: number;
    nombre: string;
    valor: number;
}

export interface WidgetTotal {
    id: number;
    nombre: string;
    valor: number;
    texto: string;
    icono: React.ElementType;
}

export interface dataInscripciones {
    id: number;
    nombre: string;
    fecha: string;
    curso: string;
    estado: string;
}

export interface ObjectWidget {
    inscripciones: WidgetInscripciones[];
    cursos: WidgetCursos[];
    total: WidgetTotal[];
    dataInscripciones: dataInscripciones[];
}
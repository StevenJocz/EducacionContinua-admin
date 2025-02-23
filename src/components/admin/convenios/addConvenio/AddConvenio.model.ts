export interface ConvenioRegistrosModel {
    id: number;
    convenioId: number;
    nombre: string;
    tipoDocumento: string;
    documento: string;
}

export interface ConvenioIdModel {
    id: number;
    nombre: string;
    nit: string;
    celular: number;
    correo: string;
    fechaInicio: Date | null
    fechaFin: Date | null
    observacion: string;
    idCurso: number;
    registros: ConvenioRegistrosModel[];
}
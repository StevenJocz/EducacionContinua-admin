export interface ConvenioRegistrosModel {
    id: number;
    nombres: string;
    tipoDocumento: string;
    documento: string;
}

export interface ConvenioIdModel {
    id: number;
    nombres: string;
    nit: string;
    celular: number;
    correo: string;
    fechaInicio: string;
    fechaFin: string;
    observacion: string;
    idCurso: number;
    estado: boolean;
    registros: ConvenioRegistrosModel[];
}
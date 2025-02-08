export interface CuponesModel {
    id: number;
    titulo: string;
    codigo: string;
    descuento: string;
    fechaInicio:  Date;
    fechaFin:  Date;
    estado: boolean;
}
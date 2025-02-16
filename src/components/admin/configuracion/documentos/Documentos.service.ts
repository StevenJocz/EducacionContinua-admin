import { DocumentoModel } from "./Documentos.model";


export const fetchId = (id: number) => {
    const data: DocumentoModel = { id: 1, prefijo: "CC" , nombre: "Cédula de Ciudadanía"}
    return data;
};

export const fetchData = () => {
    const Data:DocumentoModel[] = [
        { id: 1, prefijo: "CC",  nombre: "Cédula de Ciudadanía"},
        { id: 2, prefijo: "TI", nombre: "Tarjeta de Identidad" },
        { id: 3, prefijo: "RC", nombre: "Registro Civil" },
        { id: 4, prefijo: "CE", nombre: "Cédula de Extranjería" },
        { id: 5, prefijo: "PA" , nombre: "Pasaporte"},
        { id: 6, prefijo: "NIT", nombre: "NIT" },
        { id: 7, prefijo: "PEP", nombre: "Permiso Especial de Permanencia" },
        { id: 8, prefijo: "DIE", nombre: "Documento de Identificación Extranjero" },
        { id: 9, prefijo: "SC", nombre: "Salvoconducto de Permanencia" },
        { id: 10, prefijo: "PPT", nombre: "Permiso por Protección Temporal" }
    ];

    return Data;
};
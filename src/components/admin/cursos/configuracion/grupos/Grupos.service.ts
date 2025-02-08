import dayjs from "dayjs";
import { GrupoModel } from "./Grupos.model";

export const fetchIdGrupo = (id: number) => {
    const grupo: GrupoModel = {
        id: 1,
        nombre: 'Grupo 2025-1',
        fechaInicio: new Date('2025-01-01T00:00:00'), 
        fechaFin: new Date('2025-08-01T00:00:00'),
        precio: '1200000',
        estado: true,
    };

    return grupo;
};

export const fetchGrupo = (id: number) => {
    const gruposData = [
        {
            id: 1,
            nombre: 'Grupo 2025-1',
            fechaInicio: new Date('2025-01-01T00:00:00'),
            fechaFin: new Date('2025-08-01T00:00:00'),
            precio: '1200000',
            estado: true,
        },
        {
            id: 2,
            nombre: 'Grupo 2025-2',
            fechaInicio: new Date('2025-07-01T00:00:00'),
            fechaFin: new Date('2025-11-01T00:00:00'),
            precio: '1350000',
            estado: false,
        },
    ];

    return gruposData;
};


import dayjs from "dayjs";
import { CuponesModel } from "./Cupones.model";

export const fetchIdCupon = (id: number) => {
    const cupon: CuponesModel = {
        id: 1,
        titulo: 'Estudiantes UNAC',
        codigo: '123456',
        fechaInicio: new Date('2025-01-01T00:00:00'),
        fechaFin: new Date('2025-08-01T00:00:00'),
        descuento: '10',
        estado: true,
    };

    return cupon;
};

export const fetchCupones = (id: number) => {
    const cuponesData = [
        {
            id: 1,
            titulo: 'Estudiantes UNAC',
            codigo: '123456',
            fechaInicio: new Date('2025-01-01T00:00:00'),
            fechaFin: new Date('2025-08-01T00:00:00'),
            descuento: '10',
            estado: true,
        },
        {
            id: 2,
            titulo: 'Empleados UNAC',
            codigo: '123456',
            fechaInicio: new Date('2025-01-01T00:00:00'),
            fechaFin: new Date('2025-08-01T00:00:00'),
            descuento: '40',
            estado: true,
        },
    ];

    return cuponesData;
};


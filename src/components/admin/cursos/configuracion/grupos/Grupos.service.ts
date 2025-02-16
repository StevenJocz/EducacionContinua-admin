import dayjs from "dayjs";
import { GrupoModel, ProfesorModel } from "./Grupos.model";

export const fetchIdGrupo = (id: number) => {
    const grupo: GrupoModel = {
        id: 1,
        nombre: 'Grupo 2025-1',
        idProfesor: 2,
        profesor: '',
        foto: '',
        fechaInicio: new Date('2025-01-01T00:00:00'),
        fechaFin: new Date('2025-08-01T00:00:00'),
        precio: '1200000',
        estado: true,
    };

    return grupo;
};

export const fetchGrupo = (id: number) => {
    const gruposData: GrupoModel[] = [
        {
            id: 1,
            nombre: 'Grupo 2025-1',
            idProfesor: 1,
            profesor: 'Jheyson Eduardo Galvis Valencia',
            foto: 'https://edteam-media.s3.amazonaws.com/users/avatar/cc05ed07-5433-45ef-9103-a789137f6e50.jpg',
            fechaInicio: new Date('2025-01-01T00:00:00'),
            fechaFin: new Date('2025-08-01T00:00:00'),
            precio: '1200000',
            estado: true,
        },
        {
            id: 2,
            nombre: 'Grupo 2025-2',
            idProfesor: 2,
            profesor: 'Juan Pérez',
            foto: 'https://edteam-media.s3.amazonaws.com/users/avatar/466dca2f-b2a9-4a8c-bae7-ed54573e831c.jpg',
            fechaInicio: new Date('2025-07-01T00:00:00'),
            fechaFin: new Date('2025-11-01T00:00:00'),
            precio: '1350000',
            estado: false,
        },
    ];

    return gruposData;
};


export const fetchProfesores = () => {
    const profesores: ProfesorModel[] = [
        {
            id: 1,
            nombre: 'Jheyson Eduardo Galvis Valencia',
            foto: 'https://edteam-media.s3.amazonaws.com/users/avatar/cc05ed07-5433-45ef-9103-a789137f6e50.jpg',
        },
        {
            id: 2,
            nombre: 'Juan Pérez',
            foto: 'https://edteam-media.s3.amazonaws.com/users/avatar/466dca2f-b2a9-4a8c-bae7-ed54573e831c.jpg',
        },
        {
            id: 3,
            nombre: "Javier Gómez",
            foto: "https://edteam-media.s3.amazonaws.com/users/avatar/c3e463c6-8c4f-415e-b4c4-a2e283d9a205.png"
        },
        {
            id: 4,
            nombre: "Laura Méndez",
            foto: "https://lh3.googleusercontent.com/a/AGNmyxaRBphK531qp_3jCYQOMOnnor6KzpBXB3Sy9OtYIPk=s96-c"
        },
        {
            id: 5,
            nombre: "Andrés Salazar",
            foto: "https://edteam-media.s3.amazonaws.com/users/avatar/a81dc6ae-eff6-4d2c-a340-8c04719d62ba.jpg"
        }
    ];

    return profesores;
};


import { ConveniosModel } from "./Convenios.model";

export const fetchData = () => {
    const Data: ConveniosModel[] = [
        {
            id: 1,
            nombres: 'Clínica San Rafael',
            nit: '800123456-7',
            fechaInicio: '2024-01-15',
            fechaFin: '2025-01-15',
            curso: 'Atención y Cuidado del Paciente',
            estado: true

        },
        {
            id: 2,
            nombres: 'Hospital Vida y Salud',
            nit: '900456789-3',
            fechaInicio: '2023-06-10',
            fechaFin: '2024-06-10',
            curso: 'Emergencias y Primeros Auxilios',
            estado: false

        },
        {
            id: 3,
            nombres: 'Farmacias Salud Plus',
            nit: '830789123-5',
            fechaInicio: '2024-03-01',
            fechaFin: '2025-03-01',
            curso: 'Gestión y Administración Farmacéutica',
            estado: true

        },
        {
            id: 4,
            nombres: 'Fundación Aprender',
            nit: '901234567-8',
            fechaInicio: '2022-09-20',
            fechaFin: '2024-09-20',
            curso: 'Educación en Salud y Prevención',
            estado: false

        },
        {
            id: 5,
            nombres: 'Distribuidora Médica Express',
            nit: '805678901-2',
            fechaInicio: '2024-05-05',
            fechaFin: '2025-05-05',
            curso: 'Logística y Distribución de Insumos Médicos',
            estado: true

        }
    ];

    return Data;
};

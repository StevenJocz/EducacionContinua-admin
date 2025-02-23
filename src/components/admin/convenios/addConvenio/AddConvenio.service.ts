import { ConvenioIdModel } from "./AddConvenio.model";

export const fetchIdConvenio = (id: number) => {
    const convenio: ConvenioIdModel[] = [
        { 
            id: 1, 
            nombres: 'Clínica San Rafael', 
            nit: '800123456-7', 
            celular: 3101234567,
            correo: 'capacitaciones@clinicasanrafael.com',
            fechaInicio: '2024-01-15', 
            fechaFin: '2025-01-15', 
            estado: true,
            observacion: 'Capacitación en primeros auxilios y manejo de emergencias para el personal médico y administrativo.',
            idCurso: 201,
            registros: [
                { id: 101, nombres: 'Laura Gómez', tipoDocumento: 'CC', documento: '1000123456' },
                { id: 102, nombres: 'Carlos Pérez', tipoDocumento: 'CC', documento: '1000789123' }
            ]
        },
        { 
            id: 2, 
            nombres: 'Hospital Vida y Salud', 
            nit: '900456789-3', 
            celular: 3159876543,
            correo: 'formacion@vidaysalud.com',
            fechaInicio: '2023-06-10', 
            fechaFin: '2024-06-10', 
            estado: false,
            observacion: 'Curso de actualización en normativas de bioseguridad y atención al paciente.',
            idCurso: 202,
            registros: [
                { id: 103, nombres: 'Mariana Ríos', tipoDocumento: 'CC', documento: '1000345678' },
                { id: 104, nombres: 'Andrés Castro', tipoDocumento: 'CE', documento: '2000456789' }
            ]
        },
        { 
            id: 3, 
            nombres: 'Farmacias Salud Plus', 
            nit: '830789123-5', 
            celular: 3005671234,
            correo: 'capacitaciones@saludplus.com',
            fechaInicio: '2024-03-01', 
            fechaFin: '2025-03-01', 
            estado: true,
            observacion: 'Capacitación en gestión de inventarios y atención farmacéutica.',
            idCurso: 203,
            registros: [
                { id: 105, nombres: 'Sofía Martínez', tipoDocumento: 'CC', documento: '1000567890' }
            ]
        },
        { 
            id: 4, 
            nombres: 'Fundación Aprender', 
            nit: '901234567-8', 
            celular: 3204567890,
            correo: 'contacto@fundacionaprender.org',
            fechaInicio: '2022-09-20', 
            fechaFin: '2024-09-20', 
            estado: false,
            observacion: 'Cursos de habilidades blandas y liderazgo para profesionales del sector salud.',
            idCurso: 204,
            registros: [
                { id: 106, nombres: 'Juan López', tipoDocumento: 'TI', documento: '3000123456' },
                { id: 107, nombres: 'Valeria Torres', tipoDocumento: 'CC', documento: '1000678901' }
            ]
        },
        { 
            id: 5, 
            nombres: 'Distribuidora Médica Express', 
            nit: '805678901-2', 
            celular: 3227896541,
            correo: 'formacion@medicaexpress.com',
            fechaInicio: '2024-05-05', 
            fechaFin: '2025-05-05', 
            estado: true,
            observacion: 'Capacitación en logística y distribución de insumos médicos.',
            idCurso: 205,
            registros: [
                { id: 108, nombres: 'Javier Herrera', tipoDocumento: 'CC', documento: '1000789012' }
            ]
        },

    ]
    const cursoEncontrado = convenio.find(convenio => convenio.id === id);
    return cursoEncontrado ? [cursoEncontrado] : [];
};

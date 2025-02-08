import { ListCurso } from "./Cursos.model";

export const fetchListaCursos = (): ListCurso[] => {
    return [
        {
            id: 1,
            codigo: '5039708',
            title: 'Inglés A1: Introducción al Idioma',
            image: 'https://edteam-media.s3.amazonaws.com/courses/original/a548d03b-1b82-4412-b630-8c9841986470.png', // Ruta de la imagen
            estado: 'Activo',
            categoria: 'Idiomas',
            dependencia: 'Facultad de Humanidades',
            temario: true,
            recursos: true,
            grupos: true,
            cupones: true
        },
        {
            id: 2,
            codigo: '5049708',
            title: 'Inglés A2: Expresiones y Conversaciones Cotidianas',
            image: 'https://edteam-media.s3.amazonaws.com/courses/big/12c8d71c-a714-454f-929c-8c39ae52fd81.png', // Ruta de la imagen
            estado: 'Activo',
            categoria: 'Idiomas',
            dependencia: 'Facultad de Humanidades',
            temario: true,
            recursos: true,
            grupos: true,
            cupones: true
        },
        {
            id: 3,
            codigo: '1049708',
            title: 'Curso Básico de Enfermería',
            image: 'https://edteam-media.s3.amazonaws.com/courses/medium/c6dea1c1-1439-4ed2-8c67-5de592531a22.png', // Ruta de la imagen
            estado: 'Activo',
            categoria: 'Enfermería',
            dependencia: 'Facultad de Ciencias de la Salud',
            temario: true,
            recursos: true,
            grupos: true,
            cupones: true
        },
        {
            id: 4,
            codigo: '5549708',
            title: 'Fundamentos de Ingeniería Civil',
            image: 'https://edteam-media.s3.amazonaws.com/courses/medium/6f8e00ab-4492-4779-b6f0-e3f4ea6c3217.png', // Ruta de la imagen
            estado: 'No activo',
            categoria: 'Ingeniería',
            dependencia: 'Facultad de Ingeniería',
            temario: true,
            recursos: true,
            grupos: false,
            cupones: true
        },
        {
            id: 5,
            codigo: '8049708',
            title: 'Educación en la Era Digital',
            image: 'https://edteam-media.s3.amazonaws.com/courses/medium/4754fbff-50b4-414f-8237-5ce2bc5227b1.jpeg', // Ruta de la imagen
            estado: 'Activo',
            categoria: 'Educación',
            dependencia: 'Facultad de Educación',
            temario: true,
            recursos: true,
            grupos: true,
            cupones: true
        },
        {
            id: 6,
            codigo: '239708',
            title: 'Análisis de Datos con Python',
            image: 'https://edteam-media.s3.amazonaws.com/courses/medium/d1044058-1867-4e3c-b412-75900b470528.jpeg', // Ruta de la imagen
            estado: 'Activo',
            categoria: 'Tecnología',
            dependencia: 'Facultad de Ciencias Exactas',
            temario: true,
            recursos: true,
            grupos: true,
            cupones: true
        },
        {
            id: 7,
            codigo: '1835478',
            title: 'Psicología Infantil: Teorías y Prácticas',
            image: 'https://edteam-media.s3.amazonaws.com/courses/medium/77f0da3b-ece5-4bff-ad67-500ad15f3584.png', // Ruta de la imagen
            estado: 'No activo',
            categoria: 'Psicología',
            dependencia: 'Facultad de Psicología',
            temario: false,
            recursos: false,
            grupos: false,
            cupones: false
        },
        {
            id: 8,
            codigo: '9658423',
            title: 'Diseño Gráfico con Adobe Illustrator',
            image: 'https://edteam-media.s3.amazonaws.com/courses/medium/cd1f4b9a-2a29-4d71-845d-be8bc8004b0c.jpeg', // Ruta de la imagen
            estado: 'Activo',
            categoria: 'Diseño',
            dependencia: 'Facultad de Artes',
            temario: true,
            recursos: true,
            grupos: true,
            cupones: true
        },
    ];
};
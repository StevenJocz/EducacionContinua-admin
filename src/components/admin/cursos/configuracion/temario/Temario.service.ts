import { Modulo } from "./Tamario.model";

export const fetchModulos = (id: number): Modulo[] => {
    const modulos: Modulo[] = [
        {
            id: 1,
            idCurso: 1,
            titulo: "Módulo de Introducción",
            descripcion: "Este módulo cubre los conceptos básicos.",
            temas: [
                {
                    id: 1,
                    titulo: "Conceptos Fundamentales",
                },
                {
                    id: 2,
                    titulo: "Ejemplos Prácticos",
                }
            ],
           idQuiz: 1,
        },
        {
            id: 2,
            idCurso: 1,
            titulo: "Módulo Intermedio",
            descripcion: "Este módulo cubre conceptos más avanzados.",
            temas: [
                {
                    id: 3,
                    titulo: "Funciones y Tipos",
                }
            ],
            idQuiz: 0,
        },
        {
            id: 3,
            idCurso: 1,
            titulo: "Módulo Avanzado",
            descripcion: "Este módulo cubre temas avanzados como interfaces y genéricos.",
            temas: [],
            idQuiz: 0,
        }
    ];

    return modulos;
};

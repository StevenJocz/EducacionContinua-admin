export const fetchComentarios = (id: number) => {

    const comentarios = [
        {
            id: 1,
            idGrupo: 1,
            usuario: {
                nombre: "Andrea Mejía",
                rol: "Estudiante",
                avatar: "https://static.platzi.com/media/avatars/avatars/gendaya24_f3166f26-8df6-4d22-a459-48ac60ab9564.JPG",
            },
            fecha: "15 de diciembre del 2024",
            texto:
                "¿Alguien sabe por qué en la frase 'How are you?' se usa 'are' y no 'is'? Todavía me cuesta entender eso.",
            likes: 14,
            respuestas: [
                {
                    id: 1.1,
                    usuario: {
                        nombre: "Luis García",
                        rol: "Estudiante",
                        avatar: "https://static.platzi.com/media/avatars/Diego.2206_c7b82e9b-2494-4107-a769-0e6b739dcd34.png",
                    },
                    fecha: "15 de diciembre del 2024",
                    texto:
                        "Es porque 'are' se usa con 'you'. El verbo 'is' solo va con 'he', 'she' o 'it'. ¡Sigue practicando!",
                    likes: 10,
                },
                {
                    id: 1.2,
                    usuario: {
                        nombre: "María Torres",
                        rol: "Estudiante",
                        avatar: "https://static.platzi.com/media/avatars/avatars/dianalucia.mtz_7ae8dffa-25a4-4d41-acb2-de5ce03253a6.jpg",
                    },
                    fecha: "15 de diciembre del 2024",
                    texto:
                        "Exacto, Luis tiene razón. Hay una tabla en el material del curso que lo explica muy bien.",
                    likes: 7,
                },
            ],
        },
        {
            id: 2,
            idGrupo: 1,
            usuario: {
                nombre: "Carlos Muñoz",
                rol: "Estudiante",
                avatar: "https://static.platzi.com/media/avatars/avatars/degiraldod431_25213825-4067-4893-a6ed-a298789174ed.jpg",
            },
            fecha: "15 de diciembre del 2024",
            texto:
                "¿Cuál es la diferencia entre 'What's your name?' y 'What is your name?' ¿Es lo mismo o cambia algo?",
            likes: 18,
            respuestas: [
                {
                    id: 2.1,
                    usuario: {
                        nombre: "Laura Gómez",
                        rol: "Estudiante",
                        avatar: "https://static.platzi.com/media/avatars/avatars/bellatrixaez_cd19f957-4a0c-41f5-a659-d93cccb6cc60.jpg",
                    },
                    fecha: "15 de diciembre del 2024",
                    texto:
                        "Es lo mismo, Carlos. Solo que 'What's' es una contracción. Ambas son correctas y significan lo mismo.",
                    likes: 11,
                },
                {
                    id: 2.2,
                    usuario: {
                        nombre: "Juan Pérez",
                        rol: "Estudiante",
                        avatar: "https://static.platzi.com/media/avatars/avatars/andrewvgonz_e8f6aff9-d98e-4b85-a1ec-fe1429d61909.jpg",
                    },
                    fecha: "15 de diciembre del 2024",
                    texto:
                        "Sí, las contracciones son comunes en inglés hablado para hacerlo más rápido. Pero las dos formas están bien.",
                    likes: 9,
                },
            ],
        },
        {
            id: 3,
            idGrupo: 1,
            usuario: {
                nombre: "Sofía Rivera",
                rol: "Estudiante",
                avatar: "https://static.platzi.com/media/avatars/cuadros.torres_c807234e-06e5-45b9-ad5e-b48937ea1911.jpg",
            },
            fecha: "15 de diciembre del 2024",
            texto:
                "¿Cómo se pregunta la edad correctamente? Vi en una serie que decían 'How old are you?' pero no entiendo por qué.",
            likes: 12,
            respuestas: [
                {
                    id: 3.1,
                    usuario: {
                        nombre: "Fernando López",
                        rol: "Estudiante",
                        avatar: "https://static.platzi.com/media/avatars/sander9fo_c135e334-8fa4-46e7-bf16-01c102f5539f.jfif",
                    },
                    fecha: "15 de diciembre del 2024",
                    texto:
                        "Es porque 'How old' significa 'qué tan viejo'. En inglés, así se pregunta la edad de alguien.",
                    likes: 8,
                },
                {
                    id: 3.2,
                    usuario: {
                        nombre: "Isabella Díaz",
                        rol: "Estudiante",
                        avatar: "https://static.platzi.com/media/avatars/avatars/grecibriela1_0c1a5ee6-e9a1-43bf-960a-bc07a3c833dc.jpg",
                    },
                    fecha: "15 de diciembre del 2024",
                    texto:
                        "Sí, esa es la forma correcta. No se traduce literalmente, pero es cómo se dice en inglés.",
                    likes: 6,
                },
            ],
        },
    ];


    const comentariosEncontrados = comentarios.filter(comentario => comentario.idGrupo === id);
    return comentariosEncontrados;
}
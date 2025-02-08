import { Anuncio } from "./Anuncios.models"



export const fetchAnuncios = (cursoId: number, grupoId: number) => {
    const anuncios: Anuncio[] = [
        {
            id: 1,
            idCurso: 1,
            idGrupo: 1,
            nombre: 'Juan Pérez',
            rol: 'Instructor',
            mensaje: 'Hola grupo, les recordamos que el día de hoy 13 de Diciembre tenemos la clase en vivo. La clase iniciará en este horario: 6 PM. Pueden acceder dando clic aquí.',
            fecha: 'Hace 1 día',
            imagenUrl: 'https://media.licdn.com/dms/image/C4D03AQGy-l0wlpFXiA/profile-displayphoto-shrink_800_800/0/1554677907835?e=2147483647&v=beta&t=KcmKFvahTadhxM1_u7YCbAqkGLYKXAoxTnnSqfzWYdw',
        },
        {
            id: 2,
            idCurso: 1,
            idGrupo: 1,
            nombre: 'Juan Pérez',
            rol: 'Instructor',
            mensaje: '¡No olviden, chicos! La próxima clase será el 15 de Diciembre a las 4 PM. Asegúrense de estar listos para aprender más sobre el tema. ¡Nos vemos pronto!',
            fecha: 'Hace 2 días',
            imagenUrl: 'https://media.licdn.com/dms/image/C4D03AQGy-l0wlpFXiA/profile-displayphoto-shrink_800_800/0/1554677907835?e=2147483647&v=beta&t=KcmKFvahTadhxM1_u7YCbAqkGLYKXAoxTnnSqfzWYdw',
        },
        {
            id: 3,
            idCurso: 1,
            idGrupo: 1,
            nombre: 'Juan Pérez',
            rol: 'Instructor',
            mensaje: '¡Atención! Este viernes 17 de Diciembre tendremos una clase especial sobre las últimas tendencias. Prepárense para una experiencia interactiva. ¡No falten!',
            fecha: 'Hace 3 días',
            imagenUrl: 'https://media.licdn.com/dms/image/C4D03AQGy-l0wlpFXiA/profile-displayphoto-shrink_800_800/0/1554677907835?e=2147483647&v=beta&t=KcmKFvahTadhxM1_u7YCbAqkGLYKXAoxTnnSqfzWYdw',
        },
        {
            id: 4,
            idCurso: 1,
            idGrupo: 1,
            nombre: 'Juan Pérez',
            rol: 'Instructor',
            mensaje: 'Recuerden que el 20 de Diciembre tendremos una evaluación en línea. Asegúrense de repasar los temas previos. ¡Mucho ánimo!',
            fecha: 'Hace 4 días',
            imagenUrl: 'https://media.licdn.com/dms/image/C4D03AQGy-l0wlpFXiA/profile-displayphoto-shrink_800_800/0/1554677907835?e=2147483647&v=beta&t=KcmKFvahTadhxM1_u7YCbAqkGLYKXAoxTnnSqfzWYdw',
        },
        {
            id: 5,
            idCurso: 1,
            idGrupo: 1,
            nombre: 'Juan Pérez',
            rol: 'Instructor',
            mensaje: 'Les comparto un recurso adicional para la clase de mañana. Revisen el material y prepárense para la discusión en grupo. ¡Nos vemos!',
            fecha: 'Hace 5 días',
            imagenUrl: 'https://media.licdn.com/dms/image/C4D03AQGy-l0wlpFXiA/profile-displayphoto-shrink_800_800/0/1554677907835?e=2147483647&v=beta&t=KcmKFvahTadhxM1_u7YCbAqkGLYKXAoxTnnSqfzWYdw',
        },
        {
            id: 6,
            idCurso: 2,
            idGrupo: 2,
            nombre: 'Ana González',
            rol: 'Instructora',
            mensaje: '¡Hola a todos! Les recuerdo que mañana 14 de diciembre tendremos la clase en vivo sobre el tema de marketing digital. La clase comenzará a las 5 PM. ¡Nos vemos pronto!',
            fecha: 'Hace 1 día',
            imagenUrl: 'https://media.licdn.com/dms/image/C4D03AQEewhkFqqLygQ/profile-displayphoto-shrink_800_800/0/1659373587242?e=2147483647&v=beta&t=Bla3MLdF_Wg5tw3iqO_dnEZ7BnzC4l0mXDm7hMqH5X4',
        },
        {
            id: 7,
            idCurso: 2,
            idGrupo: 2,
            nombre: 'Ana González',
            rol: 'Instructora',
            mensaje: 'Este viernes 16 de diciembre tendremos una clase extra para revisar el material del curso. Será a las 3 PM, así que asegúrense de estar listos para preguntar cualquier duda.',
            fecha: 'Hace 2 días',
            imagenUrl: 'https://media.licdn.com/dms/image/C4D03AQEewhkFqqLygQ/profile-displayphoto-shrink_800_800/0/1659373587242?e=2147483647&v=beta&t=Bla3MLdF_Wg5tw3iqO_dnEZ7BnzC4l0mXDm7hMqH5X4',
        },
        {
            id: 8,
            idCurso: 2,
            idGrupo: 2,
            nombre: 'Ana González',
            rol: 'Instructora',
            mensaje: 'Recuerden que el 19 de diciembre tendremos una clase especial sobre estrategias de SEO. No falten, será una sesión muy interactiva.',
            fecha: 'Hace 3 días',
            imagenUrl: 'https://media.licdn.com/dms/image/C4D03AQEewhkFqqLygQ/profile-displayphoto-shrink_800_800/0/1659373587242?e=2147483647&v=beta&t=Bla3MLdF_Wg5tw3iqO_dnEZ7BnzC4l0mXDm7hMqH5X4',
        }

    ];

    const AnunciosEncontrados = anuncios.filter(anuncio => anuncio.idCurso === cursoId && anuncio.idGrupo === grupoId);
    return AnunciosEncontrados;

}
import { FaqsModel } from "./FAQS.model";

export const fetchId = (id: number) => {
    const data: FaqsModel =  {
        id: 1,
        pregunta: "¿Cómo me registro en el sistema SLIES?",
        respuesta: "Para registrarte, debes crear una cuenta con tu correo electrónico y completar el formulario de inscripción."
    }
    return data;
};

export const fetchData = () => {
    const Data:FaqsModel[] = [
        {
            id: 1,
            pregunta: "¿Cómo me registro en el sistema SLIES?",
            respuesta: "Para registrarte, debes crear una cuenta con tu correo electrónico y completar el formulario de inscripción."
        },
        {
            id: 2,
            pregunta: "¿Cómo puedo inscribirme en un curso?",
            respuesta: "Inicia sesión, busca el curso de tu interés y haz clic en 'Inscribirme'. Si es un curso pago, sigue las instrucciones de pago."
        },
        {
            id: 3,
            pregunta: "¿Puedo acceder a los cursos en cualquier momento?",
            respuesta: "Sí, los cursos están disponibles 24/7 para que los estudies a tu propio ritmo."
        },
        {
            id: 4,
            pregunta: "¿Cómo funcionan los eventos en SLIES?",
            respuesta: "Los eventos pueden ser presenciales o virtuales. Para participar, debes registrarte en el evento desde la plataforma."
        },
        {
            id: 5,
            pregunta: "¿Recibiré un certificado al completar un curso?",
            respuesta: "Sí, al completar todos los módulos y evaluaciones del curso, recibirás un certificado digital."
        },
        {
            id: 6,
            pregunta: "¿Puedo obtener soporte si tengo problemas con la plataforma?",
            respuesta: "Sí, puedes contactar al soporte técnico a través del chat en vivo o enviando un correo a soporte@slies.com."
        },
        {
            id: 7,
            pregunta: "¿Los cursos tienen un límite de tiempo para completarlos?",
            respuesta: "Algunos cursos pueden tener fechas límite, especialmente los que son en vivo o con acompañamiento de instructores."
        },
        {
            id: 8,
            pregunta: "¿Cómo puedo ver mi progreso en un curso?",
            respuesta: "Puedes ver tu progreso desde tu perfil en la sección 'Mis Cursos'."
        },
        {
            id: 9,
            pregunta: "¿SLIES ofrece cursos gratuitos?",
            respuesta: "Sí, hay cursos gratuitos y pagos. Puedes filtrarlos en la plataforma según tu interés."
        },
        {
            id: 10,
            pregunta: "¿Cómo cancelo mi inscripción en un curso o evento?",
            respuesta: "Puedes cancelar tu inscripción desde la sección 'Mis Cursos' o 'Mis Eventos'. Algunas cancelaciones pueden tener restricciones según el curso o evento."
        }
    ];

    return Data;
};
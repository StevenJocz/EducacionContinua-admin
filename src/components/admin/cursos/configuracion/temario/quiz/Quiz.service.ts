import { QuizObjecto } from "./Quiz.model";

export const fetchQuiz = (id: number) => {
    const Quiz: QuizObjecto = {
        idQuizz: 1,
        idModulo: 1,
        titulo: 'Quiz de Geografía',
        descripcion: 'Este quiz evalúa conocimientos básicos de geografía.',
        preguntas: [
            {
                id: Date.now(),
                texto: '¿Cuál es la capital de Colombia?',
                respuestas: [
                    { id: Date.now(), texto: 'Bogotá', esCorrecta: true },
                    { id: Date.now(), texto: 'Medellín', esCorrecta: false },
                    { id: Date.now(), texto: 'Cali', esCorrecta: false },
                    { id: Date.now(), texto: 'Barranquilla', esCorrecta: false },
                ],
            },
        ],
    };

    return Quiz;
};
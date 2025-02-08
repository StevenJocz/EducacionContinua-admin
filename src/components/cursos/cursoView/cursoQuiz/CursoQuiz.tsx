import style from './CursoQuiz.module.css';
import { Quiz } from '../Curso.model';
import { IoAlertCircleSharp, IoCheckmark, IoCheckmarkCircle, IoCloseCircleSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useCursos } from '@/context/Curso.context';

type Props = {
    quiz: Quiz;
    cursoId: number;
    moduloId: number;
};

const CursoQuiz: React.FC<Props> = ({
    quiz,
    cursoId,
    moduloId
}) => {
    const [presentarQuiz, setPresentarQuiz] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [correctOption, setCorrectOption] = useState<number | null>(null);
    const [quizFinished, setQuizFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState<{ questionId: number; userAnswer: number; isCorrect: boolean }[]>([]);
    const { actualizarProgreso } = useCursos();

    useEffect(() => {
        // Restablecer todos los estados cuando cambie el quiz
        setPresentarQuiz(false);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswerCorrect(null);
        setCorrectOption(null);
        setQuizFinished(false);
        setUserAnswers([]);
    }, [quiz]);

    const handleOptionSelect = (optionId: number) => {
        if (isAnswerCorrect === null) {
            setSelectedOption(optionId);
            setIsAnswerCorrect(null);
        }
    };

    const handleCheckAnswer = () => {
        const currentQuestion = quiz.preguntas[currentQuestionIndex];
        const selected = currentQuestion.opciones.find(option => option.id === selectedOption);
        const correct = currentQuestion.opciones.find(option => option.correcta);

        if (selected && selected.correcta) {
            setIsAnswerCorrect(true);
            setUserAnswers([
                ...userAnswers,
                { questionId: currentQuestion.id, userAnswer: selected.id, isCorrect: true }
            ]);
        } else {
            setIsAnswerCorrect(false);
            setCorrectOption(correct ? correct.id : null);
            setUserAnswers([
                ...userAnswers,
                { questionId: currentQuestion.id, userAnswer: selectedOption ?? -1, isCorrect: false }
            ]);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.preguntas.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswerCorrect(null);
            setCorrectOption(null);
        } else {
            setQuizFinished(true);
            // Calcular el porcentaje de respuestas correctas
            const correctAnswers = userAnswers.filter(ans => ans.isCorrect).length;
            const totalQuestions = quiz.preguntas.length;
            const percentage = (correctAnswers / totalQuestions) * 100;

            // Llamar a la función para actualizar el progreso con la calificación
            actualizarProgreso(cursoId, moduloId, 0, quiz.id, percentage);
        }
    };

    // Calcular el progreso
    const progreso = (currentQuestionIndex / quiz.preguntas.length) * 100;

    return (
        <div className={style.CursoQuiz}>
            <div className={style.CursoQuiz_Encabezado}>
                <h2>{quiz.titulo}</h2>
                {quiz.realizado && (
                    <span>
                        Quiz realizado <IoCheckmark className={style.IconoAprobado} />
                        Calificación: {quiz.calificacion}
                    </span>
                )}
            </div>
            <p>{quiz.descripcion}</p>

            {!presentarQuiz ? (
                <div className={style.CursoQuiz_Pre}>
                    <ul>
                        <li><IoAlertCircleSharp /> Puedes tomar el quiz tantas veces como quieras.</li>
                        <li><IoAlertCircleSharp /> El quiz consta de <span>{quiz.preguntas.length} preguntas.</span></li>
                        <li><IoAlertCircleSharp /> No tienes límite de tiempo para presentarlo, sin estrés.</li>
                        <li><IoAlertCircleSharp /> Al finalizar sabrás qué conocimientos debes reforzar.</li>
                    </ul>
                    <button onClick={() => setPresentarQuiz(true)}>Presentar quiz</button>
                </div>
            ) : quizFinished ? (
                <div className={style.CursoQuiz_Content_Respuesta}>
                    <h3>Resumen de tus respuestas:</h3>
                    <p>¡Buen trabajo! Aquí tienes el resumen de tus respuestas. Recuerda que cada intento es una oportunidad para mejorar. No te detengas, sigue aprendiendo y reforzando tus conocimientos. ¡Lo estás haciendo genial!</p>
                    <ul>
                        {quiz.preguntas.map((pregunta, index) => {
                            const answer = userAnswers.find((ans) => ans.questionId === pregunta.id);
                            const isCorrect = answer ? answer.isCorrect : false;
                            return (
                                <li key={pregunta.id}>
                                    <div>
                                        <h4>{index + 1}. {pregunta.texto}</h4>
                                        <p>
                                            <span>Respuesta elegida:</span> {" "}
                                            {pregunta.opciones.find((op) => op.id === (answer ? answer.userAnswer : -1))?.texto}
                                        </p>
                                    </div>
                                    {isCorrect ? (
                                        <span className={style.CursoQuiz_Content_Respuesta_Correcta}>
                                            <IoCheckmarkCircle /> Correcta
                                        </span>
                                    ) : (
                                        <span className={style.CursoQuiz_Content_Respuesta_InCorrecta}>
                                            <IoCloseCircleSharp />
                                            Incorrecta. <span>Respuesta correcta:</span> <span>{" "}
                                                {pregunta.opciones.find((op) => op.correcta)?.texto}</span>
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <div className={style.CursoQuiz_Content}>
                    <div className={style.CursoQuiz_Content_Header}>
                        <h3>Pregunta {currentQuestionIndex + 1} de {quiz.preguntas.length}</h3>
                        <div className={style.Progreso}>
                            <div
                                className={style.Progreso_inner}
                                style={{ width: `${progreso}%` }} // Actualiza el ancho de la barra de progreso
                            ></div>
                        </div>
                    </div>
                    <div className={style.CursoQuiz_Content_Card}>
                        {/* Pregunta actual */}
                        <h3>{quiz.preguntas[currentQuestionIndex].texto}</h3>
                        {/* Opciones de respuesta */}
                        <ul>
                            {quiz.preguntas[currentQuestionIndex].opciones.map((opcion) => (
                                <li key={opcion.id}>
                                    <input
                                        type="radio"
                                        name={`pregunta-${quiz.preguntas[currentQuestionIndex].id}`}
                                        id={`opcion-${opcion.id}`}
                                        checked={selectedOption === opcion.id}
                                        onChange={() => handleOptionSelect(opcion.id)}
                                        disabled={isAnswerCorrect !== null} // Deshabilita después de verificar la respuesta
                                    />
                                    <label htmlFor={`opcion-${opcion.id}`}>{opcion.texto}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {isAnswerCorrect !== null && (
                        <div>
                            {isAnswerCorrect ? (
                                <p>¡Respuesta correcta!</p>
                            ) : (
                                <p>
                                    La respuesta correcta es:
                                    <strong>
                                        {quiz.preguntas[currentQuestionIndex].opciones.find(
                                            option => option.id === correctOption
                                        )?.texto}
                                    </strong>
                                </p>
                            )}
                        </div>
                    )}
                    {/* Botones */}
                    <div className={style.CursoQuiz_Btn}>
                        {/* Botón Comprobar respuesta */}
                        {isAnswerCorrect === null && (
                            <button
                                className={`${style.CursoQuiz_Btn_Comprobar} ${selectedOption ? "" : style.CursoQuiz_Btn_Cursor}`}
                                onClick={handleCheckAnswer}
                            >
                                Comprobar respuesta
                            </button>
                        )}

                        {/* Botón Siguiente pregunta */}
                        {isAnswerCorrect !== null && (
                            <button
                                className={`${style.CursoQuiz_Btn_Siguiente}`}
                                onClick={handleNextQuestion}
                            >
                                Siguiente
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CursoQuiz;

import { StyledTextArea, StyledTextField } from '@/utils/MaterialUI';
import { FieldArray, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { IoCloseCircle, IoTrashOutline } from 'react-icons/io5';
import { QuizObjecto } from './Quiz.model';
import style from '../../Configuracion.module.css';
import { fetchQuiz } from './Quiz.service';

interface Props {
    idModulo: number;
    idQuiz: number;
    onClose: () => void;
}

const Quiz: React.FC<Props> = ({ idModulo, idQuiz, onClose }) => {

    useEffect(() => {
        if (idQuiz === 0) return;
        handleQuiz(idQuiz)
    }, [idQuiz]);


    const [quiz, setQuiz] = useState<QuizObjecto>({
        idQuizz: idQuiz,
        idModulo: idModulo,
        titulo: '',
        descripcion: '',
        preguntas: [],
    });

    const handleQuiz = async (id: number) => {
        const quizData = await fetchQuiz(id);
        setQuiz(quizData);
    };

    const handleSubmit = async (values: QuizObjecto) => {
        console.log('Quiz Created:', values);
    };

    return (
        <div className={style.Modal}>
            <div className={style.Modal_Content}>
                <div className={style.Modal_Content_Encabezado}>
                    <h2>Quiz</h2>
                    <IoCloseCircle className={style.Modal_Content_Encabezado_Icono} onClick={onClose} />
                </div>

                <Formik initialValues={quiz} onSubmit={handleSubmit} enableReinitialize>
                    {({ values, handleChange, handleBlur, setFieldValue }) => (
                        <Form>
                            {/* Título */}
                            <div className={style.Formulario_Input}>
                                <StyledTextField
                                    name="titulo"
                                    label="Título del Quiz"
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    value={values.titulo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Escribe el título del quiz"
                                    fullWidth
                                />
                            </div>

                            {/* Descripción */}
                            <div className={style.Formulario_Input}>
                                <StyledTextArea
                                    aria-label="Descripción del quiz"
                                    minRows={2}
                                    placeholder="Descripción del quiz"
                                    value={values.descripcion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="descripcion"
                                />
                            </div>

                            {/* Preguntas */}
                            <FieldArray name="preguntas">
                                {({ push, remove }) => (
                                    <div>
                                        {values.preguntas.map((pregunta, index) => (
                                            <div key={index} className={style.Quiz_Preguntas}>
                                                <div className={style.Quizz_Pregunta_Content}>
                                                    {/* Encabezado de la pregunta */}
                                                    <div className={style.Quizz_Pregunta_Content_Encabezado}>
                                                        <h3>Pregunta {index + 1}</h3>
                                                        <IoTrashOutline
                                                            className={style.iconoBorrar}
                                                            onClick={() => remove(index)}
                                                        />
                                                    </div>

                                                    {/* Input de la pregunta */}
                                                    <div className={style.Formulario_Input}>
                                                        <StyledTextField
                                                            name={`preguntas[${index}].texto`}
                                                            label={`Pregunta ${index + 1}`}
                                                            variant="outlined"
                                                            size="small"
                                                            color="secondary"
                                                            value={pregunta.texto}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            placeholder="Escribe la pregunta"
                                                            fullWidth
                                                        />
                                                    </div>

                                                    {/* Respuestas */}
                                                    {pregunta.respuestas.map((respuesta, optionIndex) => {
                                                        const radioName = `preguntas[${index}].respuestaCorrecta`;
                                                        return (
                                                            <div key={optionIndex} className={style.Formulario_Input_Content}>
                                                                <div className={style.Formulario_Input}>
                                                                    <StyledTextField
                                                                        name={`preguntas[${index}].respuestas[${optionIndex}].texto`}
                                                                        label={`Respuesta ${optionIndex + 1}`}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        color="secondary"
                                                                        value={respuesta.texto}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="Escribe la opción"
                                                                        fullWidth
                                                                    />
                                                                </div>

                                                                {/* Selector de respuesta correcta */}
                                                                <div className={style.Quizz_Pregunta_Content_Opcion_Input}>
                                                                    <input
                                                                        type="radio"
                                                                        id={`respuesta-${index}-${optionIndex}`}
                                                                        name={radioName}
                                                                        checked={respuesta.esCorrecta}
                                                                        onChange={() => {
                                                                            const updatedQuestions = [...values.preguntas];
                                                                            updatedQuestions[index].respuestas.forEach((r, idx) => {
                                                                                r.esCorrecta = idx === optionIndex;
                                                                            });
                                                                            setFieldValue('preguntas', updatedQuestions);
                                                                        }}
                                                                    />
                                                                    <label htmlFor={`respuesta-${index}-${optionIndex}`}>
                                                                        Correcta
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Botón para agregar preguntas */}
                                        <div className={style.Formulario_Agregar}>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    push({
                                                        id: Date.now(),
                                                        texto: '',
                                                        respuestas: Array(4).fill(null).map(() => ({
                                                            id: Date.now(),
                                                            texto: '',
                                                            esCorrecta: false,
                                                        })),
                                                    })
                                                }
                                            >
                                                Agregar Pregunta
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </FieldArray>

                            {/* Botón de envío */}
                            <div className={style.Formulario_Boton}>
                                <button type="submit">{idQuiz > 0 ? 'Guardar Cambios' : 'Registrar Quiz'}</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Quiz;

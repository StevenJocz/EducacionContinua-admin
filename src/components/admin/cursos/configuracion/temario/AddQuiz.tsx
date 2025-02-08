import style from '../Configuracion.module.css';
import { Formik, Form, Field, FieldArray, FormikValues, ErrorMessage } from 'formik';
import { IoCloseCircle, IoTrashOutline } from 'react-icons/io5';
import { Quiz, Pregunta, Respuesta } from '../temario/Tamario.model';
import { StyledTextArea, StyledTextField } from '@/utils/MaterialUI';

interface Props {
    idModulo: number;
    quizEdit?: Quiz | null;
    onClose: () => void;
    onAgregarQuiz: (idModulo: number, quiz: Quiz) => void;
    onEditarQuiz: (idModulo: number, quiz: Quiz) => void;
}

const AddQuiz: React.FC<Props> = ({ idModulo, quizEdit, onClose, onAgregarQuiz, onEditarQuiz }) => {
    const handleRegistrar = (values: FormikValues) => {
        const quiz: Quiz = {
            idQuizz: quizEdit ? quizEdit.idQuizz : Date.now(),
            idModulo,
            titulo: values.titulo,
            descripcion: values.descripcion,
            preguntas: values.preguntas.map((pregunta: Pregunta) => ({
                ...pregunta,
                id: pregunta.id || Date.now(),  // Asignamos un id único si no tiene
                respuestas: pregunta.respuestas.map((respuesta: Respuesta) => ({
                    ...respuesta,
                    id: respuesta.id || Date.now(),  // Asignamos un id único si no tiene
                }))
            })),
        };

        if (quizEdit) {
            onEditarQuiz(idModulo, quiz);
        } else {
            // Si es un nuevo quiz, se llamará onAgregarQuiz
            onAgregarQuiz(idModulo, quiz);
        }
    };


    return (
        <div className={style.Modal}>
            <div className={style.Modal_Content}>
                <div className={style.Informacion}>
                    <div className={style.Modal_Content_Encabezado}>
                        <h2>{quizEdit ? 'Editar Quiz' : 'Agregar Quiz'}    {quizEdit?.idModulo}</h2>
                        <IoCloseCircle className={style.Modal_Content_Encabezado_Icono} onClick={onClose} />
                    </div>

                    <Formik
                        initialValues={{
                            titulo: quizEdit ? quizEdit.titulo : '',
                            descripcion: quizEdit ? quizEdit.descripcion : '',
                            preguntas: quizEdit ? quizEdit.preguntas : [],
                        }}
                        onSubmit={handleRegistrar}
                    >
                        {({ values }) => (
                            <Form>
                                <div className={style.Formulario_Input}>
                                    <StyledTextField
                                        name="titulo"
                                        label="Título del quiz"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        placeholder="Escribe el título del tema"
                                        value={values.titulo}
                                    />
                                    <ErrorMessage
                                        name="titulo"
                                        component={() => <p className={style.Error}>{values.titulo}</p>}
                                    />
                                </div>
                                <div className={style.Formulario_Input}>
                                    <StyledTextArea
                                        aria-label="Descripción del tema"
                                        minRows={2}
                                        placeholder="Añade una descripción del quiz"
                                    />
                                    <ErrorMessage
                                        name="descripcion"
                                        component={() => <p className={style.Error}>{values.descripcion}</p>}
                                    />
                                </div>


                                <FieldArray name="preguntas">
                                    {({ push, remove }) => (
                                        <div>
                                            <div >
                                                <button type="button" onClick={() => push({ id: Date.now(), texto: '', respuestas: [] })}>Agregar Pregunta</button>
                                            </div>
                                            {values.preguntas.map((pregunta: Pregunta, index: number) => (
                                                <div key={pregunta.id || index}> {/* Usamos pregunta.id o índice para el key */}
                                                    <div className={style.Formulario_Input}>
                                                        <div className={style.Formulario_Input_Content}>
                                                            <StyledTextField
                                                                name={`preguntas.${index}.texto`}
                                                                label={`Preguntas # ${index + 1}`}
                                                                variant="outlined"
                                                                size="small"
                                                                color="secondary"
                                                                placeholder="Escribe la pregunta"
                                                            />
                                                            <a
                                                                onClick={() => remove(index)}
                                                            >
                                                                <IoTrashOutline />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <FieldArray name={`preguntas.${index}.respuestas`}>
                                                        {({ push: pushRespuesta, remove: removeRespuesta }) => (
                                                            <>
                                                                {pregunta.respuestas.map((respuesta: Respuesta, rIndex: number) => (
                                                                    <div className={style.Formulario_Input} key={respuesta.id || rIndex}>
                                                                        <div className={style.Formulario_Input_Content}>
                                                                            <StyledTextField
                                                                                name={`preguntas.${index}.respuestas.${rIndex}.texto`}
                                                                                label={`Respuesta # ${index + 1}.${rIndex + 1}`}
                                                                                variant="outlined"
                                                                                size="small"
                                                                                color="secondary"
                                                                                placeholder="Escribe la respuesta"
                                                                            />
                                                                            <Field type="checkbox" name={`preguntas.${index}.respuestas.${rIndex}.esCorrecta`} /> Correcta
                                                                            <IoTrashOutline onClick={() => removeRespuesta(rIndex)} />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                <button type="button" onClick={() => pushRespuesta({ id: Date.now(), texto: '', esCorrecta: false })}>Agregar Respuesta</button>
                                                            </>
                                                        )}
                                                    </FieldArray>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </FieldArray>

                                <button type="submit">{quizEdit ? 'Guardar Cambios' : 'Registrar Quiz'}</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};



export default AddQuiz;

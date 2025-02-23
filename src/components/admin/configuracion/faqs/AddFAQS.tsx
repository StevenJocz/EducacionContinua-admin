import React, { useEffect, useState } from 'react'
import { FaqsModel } from './FAQS.model';
import { fetchId } from './FAQS.service';
import { FormikValues } from 'formik';
import { Formik, Form, ErrorMessage } from 'formik';
import style from './FAQS.module.css'
import { IoCloseCircle } from 'react-icons/io5';
import { StyledTextField } from '@/utils/MaterialUI';
import api from '@/service/Api.service';
import ButtonSubmit from '@/components/button/ButtonSubmit';

interface Props {
    id: number;
    onClose: () => void;
}
const AddFAQS: React.FC<Props> = ({ id, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<FaqsModel | null>(null);

    useEffect(() => {
        if (id > 0) {
            handleData(id);
        }
    }, [id]);

    const handleData = async (id: number) => {
        try {
            const dataFetch = await fetchId(id);
            setData(dataFetch);
        } catch (error) {
            console.error('Error al obtener la dependencia:', error);
        }
    };

    const handleRegistrar = async (values: FormikValues) => {
        setIsLoading(true);

        const data: FaqsModel = {
            id: id,
            pregunta: values.pregunta,
            respuesta: values.respuesta,
        };

        try {
            if (id > 0) {
                await api.put('Faqs/Put_Update_Faq', data);
            } else {
                await api.post('Faqs/Post_Create_Faq', data);
            }
        } catch (error) {
            console.error('Error al registrar:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={style.Add}>
            <div className={style.Add_Content}>
                <div className={style.Add_Content_Encabezado}>
                    <h2>Categoría</h2>
                    <IoCloseCircle
                        className={style.Add_Content_Encabezado_Icono}
                        onClick={onClose}
                    />
                </div>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        pregunta: data?.pregunta || '',
                        respuesta: data?.respuesta || '',

                    }}
                    validate={(values) => {
                        let errors: any = {};
                        if (!values.pregunta) {
                            errors.pregunta = 'El campo pregunta es obligatorio.';
                        }
                        if (!values.respuesta) {
                            errors.respuesta = 'El campo respuesta es obligatorio.';
                        }
                        return errors;
                    }}
                    onSubmit={handleRegistrar}
                >
                    {({ values, errors, setFieldValue, isSubmitting }) => (
                        <Form>
                            <div className={style.Formulario_Input}>
                                <StyledTextField
                                    name="pregunta"
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    placeholder="Escribe la pregunta"
                                    value={values.pregunta}
                                    onChange={(e) => setFieldValue('pregunta', e.target.value)}
                                />
                                <ErrorMessage name="pregunta" component={() => <p className={style.Error}>{errors.pregunta}</p>} />
                            </div>
                            <div className={style.Formulario_Input}>
                                <StyledTextField
                                    name="respuesta"
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    placeholder="Escribe la respuesta"
                                    value={values.respuesta}
                                    onChange={(e) => setFieldValue('respuesta', e.target.value)}
                                />
                                <ErrorMessage name="respuesta" component={() => <p className={style.Error}>{errors.respuesta}</p>} />
                            </div>
                            <ButtonSubmit
                                id={id}
                                isLoading={isLoading}
                                isSubmitting={isSubmitting}
                                onClose={onClose}
                            />
                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    )
}

export default AddFAQS
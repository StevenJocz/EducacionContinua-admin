import React, { useEffect, useState } from 'react'
import { FaqsModel } from './FAQS.model';
import { fetchId } from './FAQS.service';
import { FormikValues } from 'formik';
import { Formik, Form, ErrorMessage } from 'formik';
import style from './FAQS.module.css'
import { IoCloseCircle } from 'react-icons/io5';
import { StyledTextField } from '@/utils/MaterialUI';

interface Props {
    id: number;
    onClose: () => void;
}
const AddFAQS: React.FC<Props> = ({ id, onClose }) => {
    const [data, setData] = useState<FaqsModel | null>(null)

    useEffect(() => {
        if (id === 0) return;
        handleData(id);
    }, []);


    const handleData = (id: number) => {
        const dataFetch = fetchId(id);
        setData(dataFetch);
    }

    const handleRegistrar = (values: FormikValues) => {
        const data: FaqsModel = {
            id: id,
            pregunta: values.pregunta,
            respuesta: values.respuesta
        }

        if (id > 0) {
            console.log("Actualizar : ", data);
        } else {
            console.log("Guardar : ", data);
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
                    onSubmit={handleRegistrar}
                >
                    {({ values, setFieldValue }) => (
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
                                <ErrorMessage
                                    name="pregunta"
                                    component={() => <p className={style.Error}>{values.pregunta}</p>}
                                />
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
                                <ErrorMessage
                                    name="respuesta"
                                    component={() => <p className={style.Error}>{values.respuesta}</p>}
                                />
                            </div>
                            <div className={style.Formulario_Boton}>
                                <button type="submit">{id > 0 ? 'Guardar Cambios' : 'Registrar'}</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

        </div>
  )
}

export default AddFAQS
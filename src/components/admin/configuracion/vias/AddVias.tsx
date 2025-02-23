import React, { useEffect, useState } from 'react'
import { ViasModel } from './Vias.model';
import { fetchId } from './Vias.service';
import { FormikValues } from 'formik';
import { Formik, Form, ErrorMessage } from 'formik';
import { StyledTextField } from '@/utils/MaterialUI';
import style from './Vias.module.css';
import { IoCloseCircle } from 'react-icons/io5';
import api from '@/service/Api.service';
import ButtonSubmit from '@/components/button/ButtonSubmit';

interface Props {
    id: number;
    onClose: () => void;
}


const AddVias: React.FC<Props> = ({ id, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<ViasModel | null>(null);

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

        const data: ViasModel = {
            id: id,
            nombre: values.nombre
        };

        try {
            if (id > 0) {
                await api.put('TipoDirecciones/Put_Update_TipoDireccion', data);
            } else {
                await api.post('TipoDirecciones/Post_Create_TipoDireccion', data);
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
                    <h2>Tipos de direcciones</h2>
                    <IoCloseCircle
                        className={style.Add_Content_Encabezado_Icono}
                        onClick={onClose}
                    />
                </div>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        nombre: data?.nombre || '',

                    }}
                    validate={(values) => {
                        let errors: any = {};
                        if (!values.nombre) {
                            errors.nombre = 'El campo nombre del documento es obligatorio.';
                        }
                        return errors;
                    }}
                    onSubmit={handleRegistrar}
                >
                    {({ values, errors, setFieldValue, isSubmitting }) => (
                        <Form>
                            <div className={style.Formulario_Input}>
                                <StyledTextField
                                    name="nombre"
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    placeholder="Escribe el nombre de la categoría"
                                    value={values.nombre}
                                    onChange={(e) => setFieldValue('nombre', e.target.value)}
                                />
                                <ErrorMessage name="nombre" component={() => <p className={style.Error}>{errors.nombre}</p>} />
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

export default AddVias
import { IoCloseCircle } from 'react-icons/io5';
import style from './Dependencias.module.css';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { StyledTextField } from '@/utils/MaterialUI';
import { Dependencia } from './Dependencias.model';
import { useEffect, useState } from 'react';
import { fetchIdDependecia } from './Dependencias.service';
import api from '@/service/Api.service';
import ButtonSubmit from '@/components/button/ButtonSubmit';

interface Props {
    id: number;
    onClose: () => void;
}

const AddDependencia: React.FC<Props> = ({ id, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Dependencia | null>(null);

    useEffect(() => {
        if (id > 0) {
            handleData(id);
        }
    }, [id]);

    const handleData = async (id: number) => {
        try {
            const dataFetch = await fetchIdDependecia(id);
            setData(dataFetch);
        } catch (error) {
            console.error('Error al obtener la dependencia:', error);
        }
    };

    const handleRegistrar = async (values: FormikValues) => {
        setIsLoading(true);

        const data: Dependencia = {
            id: id,
            nombre: values.nombre,
        };

        try {
            if (id > 0) {
                await api.put('Dependencias/Put_Update_Dependencias', data);
            } else {
                await api.post('Dependencias/Post_Create_Dependencias', data);
            }
        } catch (error) {
            console.error('Error al registrar:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={style.AddDependencia}>
            <div className={style.AddDependencia_Content}>
                <div className={style.AddDependencia_Content_Encabezado}>
                    <h2>Dependencia</h2>
                    <IoCloseCircle
                        className={style.AddDependencia_Content_Encabezado_Icono}
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
                            errors.nombre = 'El campo nombre de la dependencia es obligatorio.';
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
                                    placeholder="Escribe el nombre de la dependencia"
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
    );
};

export default AddDependencia;

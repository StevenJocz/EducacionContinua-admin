import { useEffect, useState } from 'react';
import style from './Documentos.module.css'
import { IoCloseCircle } from 'react-icons/io5';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { StyledTextField } from '@/utils/MaterialUI';
import { DocumentoModel } from './Documentos.model';
import { fetchId } from './Documentos.service';
import api from '@/service/Api.service';
import ButtonSubmit from '@/components/button/ButtonSubmit';

interface Props {
    id: number;
    onClose: () => void;
}

const AddDocumentos: React.FC<Props> = ({ id, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<DocumentoModel | null>(null);

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

        const data: DocumentoModel = {
            id: id,
            nombre: values.nombre,
            prefijo: values.prefijo
        };

        try {
            if (id > 0) {
                await api.put('TipoDocumentos/Put_Update_TipoDocumento', data);
            } else {
                await api.post('TipoDocumentos/Post_Create_TipoDocumento', data);
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
                        nombre: data?.nombre || '',
                        prefijo: data?.prefijo || '',

                    }}
                    validate={(values) => {
                        let errors: any = {};
                        if (!values.nombre) {
                            errors.nombre = 'El campo nombre del documento es obligatorio.';
                        }
                        if (!values.prefijo) {
                            errors.prefijo = 'El campo prefijo del documento es obligatorio.';
                        }
                        return errors;
                    }}
                    onSubmit={handleRegistrar}
                >
                    {({ values, errors, setFieldValue, isSubmitting }) => (
                        <Form>
                            <div className={style.Formulario_Input}>
                                <StyledTextField
                                    name="prefijo"
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    placeholder="Escribe el prefijo del documento. Ejemplo: CC"
                                    value={values.prefijo}
                                    onChange={(e) => setFieldValue('prefijo', e.target.value)}
                                />
                                <ErrorMessage name="prefijo" component={() => <p className={style.Error}>{errors.prefijo}</p>} />
                            </div>
                            <div className={style.Formulario_Input}>
                                <StyledTextField
                                    name="nombre"
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    placeholder="Escribe el tipo de documento"
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

export default AddDocumentos
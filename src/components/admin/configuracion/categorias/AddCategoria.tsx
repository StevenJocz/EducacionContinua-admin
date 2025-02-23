import { useEffect, useState } from 'react';
import { CategoriaModel } from './Categoria.model';
import style from './Categoria.module.css'
import { IoCloseCircle } from 'react-icons/io5';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { StyledTextField } from '@/utils/MaterialUI';
import { fetchIdCategoria } from './Categoria.service';
import api from '@/service/Api.service';
import ButtonSubmit from '@/components/button/ButtonSubmit';

interface Props {
    id: number;
    onClose: () => void;
}

const AddCategoria: React.FC<Props> = ({ id, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<CategoriaModel | null>(null)

    useEffect(() => {
        if (id === 0) return;
        handleData(id);
    }, [id]);

    const handleData = async (id: number) => {
        try {
            const dataFetch = await fetchIdCategoria(id);
            setData(dataFetch);
        } catch (error) {
            console.error('Error al obtener la dependencia:', error);
        }
    };

    const handleRegistrar = async (values: FormikValues) => {
        setIsLoading(true);
        const data: CategoriaModel = {
            id: id,
            nombre: values.nombre,
        }

        try {
            if (id > 0) {
                await api.put('Categorias/Put_Update_Categoria', data);
            } else {
                await api.post('Categorias/Post_Create_Categoria', data);
            }
        } catch (error) {
            console.error('Error al registrar:', error);
        }finally {
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
                    }}
                    validate={(values) => {
                        let errors: any = {};
                        if (!values.nombre) {
                            errors.nombre = 'El campo nombre de la categoría es obligatorio.';
                        }
                        return errors;
                    }}
                    onSubmit={handleRegistrar}
                >
                    {({ values, errors, setFieldValue, isSubmitting, isValid  }) => (
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

export default AddCategoria
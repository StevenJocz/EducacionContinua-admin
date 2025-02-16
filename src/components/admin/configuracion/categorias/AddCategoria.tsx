import { useEffect, useState } from 'react';
import { CategoriaModel } from './Categoria.model';
import style from './Categoria.module.css'
import { IoCloseCircle } from 'react-icons/io5';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { StyledTextField } from '@/utils/MaterialUI';
import { fetchIdCategoria } from './Categoria.service';

interface Props {
    id: number;
    onClose: () => void;
}

const AddCategoria: React.FC<Props> = ({ id, onClose }) => {
    const [data, setData] = useState<CategoriaModel | null>(null)

    useEffect(() => {
        if (id === 0) return;
        handleData(id);
    }, []);


    const handleData = (id: number) => {
        const dataFetch = fetchIdCategoria(id);
        setData(dataFetch);
    }

    const handleRegistrar = (values: FormikValues) => {
        const data: CategoriaModel = {
            id: id,
            nombre: values.nombre,
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
                        nombre: data?.nombre || '',

                    }}
                    onSubmit={handleRegistrar}
                >
                    {({ values, setFieldValue }) => (
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
                                <ErrorMessage
                                    name="nombre"
                                    component={() => <p className={style.Error}>{values.nombre}</p>}
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

export default AddCategoria
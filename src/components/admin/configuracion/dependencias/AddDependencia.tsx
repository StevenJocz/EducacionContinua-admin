import { IoCloseCircle } from 'react-icons/io5';
import style from './Dependencias.module.css'
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { StyledTextField } from '@/utils/MaterialUI';
import { Dependencia } from './Dependencias.model';
import { useEffect, useState } from 'react';
import { fetchIdDependecia } from './Dependencias.service';

interface Props {
    id: number;
    onClose: () => void;
}

const AddDependencia: React.FC<Props> = ({ id, onClose }) => {
    const [data, setData] = useState<Dependencia | null>(null)

    useEffect(() => {
        if (id === 0) return;
        handleData(id);
    }, []);


    const handleData = (id: number) => {
        const dataFetch = fetchIdDependecia(id);
        setData(dataFetch);
    }

    const handleRegistrar = (values: FormikValues) => {
        const data: Dependencia = {
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
                                    placeholder="Escribe el nombre de la dependencia"
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

export default AddDependencia
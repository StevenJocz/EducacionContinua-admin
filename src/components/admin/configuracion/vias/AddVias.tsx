import React, { useEffect, useState } from 'react'
import { ViasModel } from './Vias.model';
import { fetchId } from './Vias.service';
import { FormikValues } from 'formik';
import { Formik, Form, ErrorMessage } from 'formik';
import { StyledTextField } from '@/utils/MaterialUI';
import style from './Vias.module.css';
import { IoCloseCircle } from 'react-icons/io5';

interface Props {
    id: number;
    onClose: () => void;
}


const AddVias : React.FC<Props> = ({ id, onClose }) => {
    const [data, setData] = useState<ViasModel | null>(null)

    useEffect(() => {
        if (id === 0) return;
        handleData(id);
    }, []);


    const handleData = (id: number) => {
        const dataFetch = fetchId(id);
        setData(dataFetch);
    }

    const handleRegistrar = (values: FormikValues) => {
        const data: ViasModel = {
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

export default AddVias
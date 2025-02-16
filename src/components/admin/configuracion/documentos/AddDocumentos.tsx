import { useEffect, useState } from 'react';
import style from './Documentos.module.css'
import { IoCloseCircle } from 'react-icons/io5';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { StyledTextField } from '@/utils/MaterialUI';
import { DocumentoModel } from './Documentos.model';
import { fetchId } from './Documentos.service';

interface Props {
    id: number;
    onClose: () => void;
}

const AddDocumentos: React.FC<Props> = ({ id, onClose }) => {
    const [data, setData] = useState<DocumentoModel | null>(null)

    useEffect(() => {
        if (id === 0) return;
        handleData(id);
    }, []);


    const handleData = (id: number) => {
        const dataFetch = fetchId(id);
        setData(dataFetch);
    }

    const handleRegistrar = (values: FormikValues) => {
        const data: DocumentoModel = {
            id: id,
            nombre: values.nombre,
            prefijo: values.prefijo
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
                        prefijo: data?.prefijo || '',

                    }}
                    onSubmit={handleRegistrar}
                >
                    {({ values, setFieldValue }) => (
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
                                <ErrorMessage
                                    name="prefijo"
                                    component={() => <p className={style.Error}>{values.prefijo}</p>}
                                />
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

export default AddDocumentos
import style from '../../Configuracion.module.css';
import { Formik, Form, ErrorMessage, FormikValues } from 'formik';
import { StyledTextArea, StyledTextField } from '@/utils/MaterialUI';
import { IoCloseCircle } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { fetchModulo } from './Modulos.service';
import { Modulo } from './Modulos.model';

interface Props {
    idModulo: number
    onClose: () => void;
}

const Modulos: React.FC<Props> = ({ idModulo, onClose }) => {
    const [modulo, setModulo] = useState<Modulo>();

    useEffect(() => {
        if (idModulo === 0) return;
        handleModulo(idModulo);

    }, [idModulo]);

    const handleModulo = async (id: number) => {
        const cursoData = await fetchModulo(id);
        setModulo(cursoData);
    };

    const handleRegistrar = (values: FormikValues) => {
        const informacionModulo: Modulo = {
            id: idModulo,
            titulo: values.titulo,
            descripcion: values.descripcion,
            activo: values.activo,
        }

        if (idModulo > 0) {
            console.log("Actualizar : ", informacionModulo);
        } else {
            console.log("Guardar : ", informacionModulo);
        }
    };

    return (
        <div className={style.Modal}>
            <div className={style.Modal_Content}>
                <div className={style.Informacion}>
                    <div className={style.Modal_Content_Encabezado}>
                        <h2>Módulos</h2>
                        <IoCloseCircle
                            className={style.Modal_Content_Encabezado_Icono}
                            onClick={onClose}
                        />
                    </div>

                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            titulo: modulo?.titulo || '',
                            descripcion: modulo?.descripcion || '',
                            activo: modulo?.activo || true,
                        }}
                        onSubmit={handleRegistrar}
                    >
                        {({ values, setFieldValue }) => (
                            <Form>
                                <div className={style.Formulario_Input}>
                                    <StyledTextField
                                        name="titulo"
                                        label="Título del módulo"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        placeholder="Escribe el título del módulo"
                                        value={values.titulo}
                                        onChange={(e) => setFieldValue('titulo', e.target.value)}
                                    />
                                    <ErrorMessage
                                        name="titulo"
                                        component={() => <p className={style.Error}>{values.titulo}</p>}
                                    />
                                </div>
                                <div className={style.Formulario_Input}>
                                    <StyledTextArea
                                        aria-label="Descripción del módulo"
                                        minRows={3}
                                        placeholder="Añade una descripción breve del módulo"
                                        value={values.descripcion}
                                        onChange={(e) => setFieldValue('descripcion', e.target.value)}
                                    />
                                    <ErrorMessage
                                        name="descripcion"
                                        component={() => <p className={style.Error}>{values.descripcion}</p>}
                                    />
                                </div>

                                <div className={style.Formulario_Boton}>
                                    <button type="submit">{idModulo ? 'Guardar Cambios' : 'Registrar Módulo'}</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Modulos
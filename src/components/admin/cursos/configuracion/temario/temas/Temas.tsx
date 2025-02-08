import style from '../../Configuracion.module.css';
import { Formik, Form, ErrorMessage, FormikValues } from 'formik';
import { StyledTextArea, StyledTextField } from '@/utils/MaterialUI';
import { IoCloseCircle } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Tema } from './Temas.model';
import { fetchTema } from './Temas.service';

interface Props {
    idModulo: number
    idTema: number
    onClose: () => void;
}

const Temas: React.FC<Props> = ({ idModulo, idTema, onClose }) => {

    const [tema, setTema] = useState<Tema>();

    useEffect(() => {
        if (idTema === 0) return;
        handleTema(idTema);
    }, [idTema]);

    const handleTema = async (id: number) => {
        const temaData = await fetchTema(id);
        console.log("Tema : ", temaData);
        setTema(temaData);
    };

    const handleRegistrar = (values: FormikValues) => {
        const informacionModulo: Tema = {
            id: idTema,
            idModulo: idModulo,
            titulo: values.titulo,
            descripcion: values.descripcion,
            video: values.videoUrl,
            activo: values.activo,
        }

        if (idTema > 0) {
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
                        <h2>Tema</h2>
                        <IoCloseCircle
                            className={style.Modal_Content_Encabezado_Icono}
                            onClick={onClose}
                        />
                    </div>

                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            titulo: tema?.titulo || '',
                            descripcion: tema?.descripcion || '',
                            video: tema?.video || '',
                            activo: tema?.activo || '',
                        }}
                        onSubmit={handleRegistrar}
                    >
                        {({ values, setFieldValue }) => (
                            <Form>
                                <div className={style.Formulario_Input}>
                                    <StyledTextField
                                        name="titulo"
                                        label="Título del tema"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        placeholder="Escribe el título del tema"
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
                                        aria-label="Descripción del tema"
                                        minRows={3}
                                        placeholder="Añade el contenido del tema"
                                        value={values.descripcion}
                                        onChange={(e) => setFieldValue('descripcion', e.target.value)}
                                    />
                                    <ErrorMessage
                                        name="descripcion"
                                        component={() => <p className={style.Error}>{values.descripcion}</p>}
                                    />
                                </div>
                                <div className={style.Formulario_Input}>
                                    <StyledTextField
                                        name="video"
                                        label="Enlace del video de YouTube"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        placeholder="Añade el enlace del video de YouTube"
                                        value={values.video}
                                        onChange={(e) => setFieldValue('video', e.target.value)}
                                    />
                                    <ErrorMessage
                                        name="video"
                                        component={() => <p className={style.Error}>{values.video}</p>}
                                    />
                                </div>

                                <div className={style.Formulario_Boton}>
                                    <button type="submit">{idTema > 0 ? 'Guardar Cambios' : 'Registrar Tema'}</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Temas
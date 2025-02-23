import { IoCloseCircle, IoImageOutline } from 'react-icons/io5'
import style from './Profesores.module.css'
import { useEffect, useState } from 'react';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { fetchIdProfesor } from './Profesores.service';
import { IdProfesorModel } from './Profesores.model';
import { StyledSelect, StyledTextArea, StyledTextField } from '@/utils/MaterialUI';
import { MenuItem } from '@mui/material';

interface Props {
    id: number;
    onClose: () => void;
}

const AddProfesor: React.FC<Props> = ({ id, onClose }) => {
    const [data, setData] = useState<IdProfesorModel | null>(null);
    const [imagen, setImagen] = useState<string>();

    useEffect(() => {
        if (id === 0) return;
        handleData(id);
    }, []);


    const handleData = (id: number) => {
        const dataFetch = fetchIdProfesor(id);
        setData(dataFetch);
        setImagen(dataFetch?.foto || '');
    }

    const handleImagenSeleccionada = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) procesarImagen(file);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file) procesarImagen(file);
    };

    const procesarImagen = (file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Solo se permiten imágenes en formato JPG o PNG.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("La imagen no debe superar los 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => setImagen(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleRegistrar = (values: FormikValues) => {
        const data: IdProfesorModel = {
            id: id,
            foto: imagen || '',
            correo: values.correo,
            apellidos: values.apellidos,
            nombres: values.nombres,
            tipoDocumento: values.tipoDocumento,
            documento: values.documento,
            celular: values.celular,
            genero: values.genero,
            titulo: values.titulo,
            descripcion: values.descripcion,
            estado: values.estado
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
                    <h2>Profesor</h2>
                    <IoCloseCircle
                        className={style.Add_Content_Encabezado_Icono}
                        onClick={onClose}
                    />
                </div>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        correo: data?.correo || '',
                        foto: '',
                        apellidos: data?.apellidos || '',
                        nombres: data?.nombres || '',
                        tipoDocumento: data?.tipoDocumento || '',
                        documento: data?.documento || '',
                        celular: data?.celular || '',
                        genero: data?.genero || '',
                        titulo: data?.titulo || '',
                        descripcion: data?.descripcion || '',
                        estado: data?.estado || true,

                    }}
                    validate={(values) => {
                        let errors: any = {};
                        const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;
                        const numericRegex = /^[0-9]+$/;
                        const alphanumericRegex = /^[A-Za-z0-9]+$/;

                        if (!values.correo) {
                            errors.correo = 'El campo correo es obligatorio.';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.correo)) {
                            errors.correo = 'Correo inválido.';
                        }

                        if (!values.apellidos) {
                            errors.apellidos = 'El campo apellidos es obligatorio.';
                        } else if (values.apellidos.length < 2) {
                            errors.apellidos = 'Debe contener al menos 2 caracteres.';
                        } else if (!nameRegex.test(values.apellidos)) {
                            errors.apellidos = 'Solo se permiten letras.';
                        }

                        if (!values.nombres) {
                            errors.nombres = 'El campo nombres es obligatorio.';
                        } else if (values.nombres.length < 2) {
                            errors.nombres = 'Debe contener al menos 2 caracteres.';
                        } else if (!nameRegex.test(values.nombres)) {
                            errors.nombres = 'Solo se permiten letras.';
                        }

                        if (!values.tipoDocumento) {
                            errors.tipoDocumento = 'El campo tipo de documento es obligatorio.';
                        }

                        if (values.documento) {
                            const numericDocuments = ['1', '2']; // Tipos de documentos que solo permiten números
                            const alphanumericDocuments = ['3', '5', '16']; // Tipos de documentos que permiten letras y números

                            if (numericDocuments.includes(values.tipoDocumento.toString())) {
                                if (!numericRegex.test(values.documento)) {
                                    errors.documento = 'El documento solo puede contener números.';
                                }
                            } else if (alphanumericDocuments.includes(values.tipoDocumento.toString())) {
                                if (!alphanumericRegex.test(values.documento)) {
                                    errors.documento = 'El documento solo puede contener letras y números.';
                                }
                            } else {
                                errors.documento = 'Tipo de documento no válido.';
                            }
                        } else {
                            errors.documento = 'El campo documento es obligatorio.';
                        }

                        if (!values.celular) {
                            errors.celular = 'El campo celular es obligatorio.';
                        } else if (!/^\d{10}$/.test(values.celular)) {
                            errors.celular = 'El celular debe contener 10 dígitos númericos.';
                        }

                        if (!values.genero) {
                            errors.genero = 'El campo género es obligatorio.';
                        }


                        return errors;
                    }}
                    onSubmit={handleRegistrar}
                >
                    {({ errors, values, setFieldValue, isSubmitting }) => (
                        <Form>

                            <div className={style.Formulario}>
                                <div className={style.Formulario_Titulo}>
                                    <h3>Contacto</h3>
                                </div>
                                <StyledTextField
                                    name='correo'
                                    variant="outlined"
                                    size="small"
                                    label="Correo electrónico"
                                    placeholder='Correo electrónico'
                                    value={values.correo}
                                    onChange={(e) => setFieldValue('correo', e.target.value)}
                                />
                                <ErrorMessage name='correo' component={() => <p className={style.Error}>{errors.correo}</p>} />
                            </div>
                            <div className={style.Formulario}>
                                <div className={style.Formulario_Titulo}>
                                    <h3>Información personal</h3>
                                </div>
                            </div>
                            <div className={style.Formulario_Dos}>
                                <div>
                                    <StyledTextField
                                        name='nombres'
                                        label="Nombres"
                                        variant="outlined"
                                        size="small"
                                        placeholder='Introduce nombres completos'
                                        value={values.nombres}
                                        onChange={(e) => setFieldValue('nombres', e.target.value)}
                                    />
                                    <ErrorMessage name='nombres' component={() => <p className={style.Error}>{errors.nombres}</p>} />
                                </div>
                                <div>
                                    <StyledTextField
                                        name='apellidos'
                                        label="Apellidos"
                                        variant="outlined"
                                        size="small"
                                        placeholder='Introduce apellidos completos'
                                        value={values.apellidos}
                                        onChange={(e) => setFieldValue('apellidos', e.target.value)}
                                    />
                                    <ErrorMessage name='apellidos' component={() => <p className={style.Error}>{errors.apellidos}</p>} />
                                </div>

                            </div>
                            <div className={style.Formulario_Dos}>
                                <div>
                                    <StyledSelect
                                        id="outlined-select-currency"
                                        select
                                        label="Tipo de documento"
                                        size="small"
                                        variant="outlined"
                                        value={values.tipoDocumento}
                                        onChange={(e) => setFieldValue('tipoDocumento', e.target.value)}
                                    >
                                        <MenuItem value='0'>
                                            Seleccione
                                        </MenuItem>
                                    </StyledSelect>
                                    <ErrorMessage name='tipoDocumento' component={() => <p className={style.Error}>{errors.tipoDocumento}</p>} />
                                </div>
                                <div>
                                    <StyledTextField
                                        name='documento'
                                        label="Número de documento"
                                        variant="outlined"
                                        size="small"
                                        placeholder='Introduce número de documento'
                                        value={values.documento}
                                        onChange={(e) => setFieldValue('documento', e.target.value)}
                                    />
                                    <ErrorMessage name='documento' component={() => <p className={style.Error}>{errors.documento}</p>} />
                                </div>
                            </div>
                            <div className={style.Formulario_Dos}>
                                <div>
                                    <StyledSelect
                                        id="outlined-select-currency"
                                        select
                                        label="Genero"
                                        size="small"
                                        variant="outlined"
                                        value={values.genero}
                                        onChange={(e) => setFieldValue('genero', e.target.value)}
                                    >
                                        <MenuItem value='0'>
                                            Seleccione
                                        </MenuItem>

                                    </StyledSelect>
                                    <ErrorMessage name='genero' component={() => <p className={style.Error}>{errors.genero}</p>} />
                                </div>
                                <div>
                                    <StyledTextField
                                        name='celular'
                                        label="Número de celular"
                                        variant="outlined"
                                        size="small"
                                        placeholder='Introduce número de celular'
                                        value={values.celular}
                                        onChange={(e) => setFieldValue('celular', e.target.value)}
                                    />
                                    <ErrorMessage name='celular' component={() => <p className={style.Error}>{errors.celular}</p>} />
                                </div>
                            </div>
                            <div className={style.Formulario}>
                                <div className={style.Formulario_Titulo}>
                                    <h3>Información del profesor</h3>
                                </div>
                                <StyledTextField
                                    name='titulo'
                                    variant="outlined"
                                    size="small"
                                    label="Título académico"
                                    placeholder="Ingresa el título académico u profesión"
                                    value={values.titulo}
                                    onChange={(e) => setFieldValue('titulo', e.target.value)}
                                />
                                <ErrorMessage name='titulo' component={() => <p className={style.Error}>{errors.titulo}</p>} />
                            </div>
                            <div className={style.Formulario}>
                                <StyledTextArea
                                    aria-label="minimum height"
                                    minRows={5}
                                    placeholder="Haz una breve descripción del profesor. Ejemplo: Licenciado en Educación y Lengua Inglesa con más de 10 años de experiencia enseñando inglés. Apasionado por guiar a los estudiantes en su aprendizaje."
                                    value={values.descripcion}
                                    onChange={(e) => setFieldValue('descripcion', e.target.value)}
                                />
                                <ErrorMessage name="descripcion" component={() => <p className={style.Error}>{errors.descripcion}</p>} />
                            </div>
                            <div className={style.Formulario_Content_Imagen}>
                                <h3>Foto</h3>
                                <div
                                    className={style.Imagen_Div}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById("fileInput")?.click()}
                                >
                                    <div>
                                        <IoImageOutline className={style.Icono} />
                                        <p>Suelte la imagen aquí o haga clic para cargarla.</p>
                                    </div>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        accept="image/png, image/jpeg"
                                        hidden
                                        onChange={handleImagenSeleccionada}
                                    />
                                </div>
                                <p>La imagen debe estar en formato JPG o PNG y tener como máximo 5 MB. Dimensiones recomendadas: 600x400 píxeles.</p>
                                {imagen &&
                                    <img src={imagen} alt="Vista previa" className={style.Imagen_Preview} />
                                }
                                <ErrorMessage name="imagen" component={() => <p className={style.ErrorImagen}>{errors.foto}</p>} />
                            </div>
                            <div className={style.Formulario_Boton}>
                                <button type='submit'>Actualizar información</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AddProfesor
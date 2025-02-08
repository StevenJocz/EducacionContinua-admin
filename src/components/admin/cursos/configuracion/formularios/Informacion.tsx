import { StyledSelect, StyledTextArea, StyledTextField } from '@/utils/MaterialUI';
import style from '../Configuracion.module.css';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { MenuItem } from '@mui/material';
import { IoAddCircle, IoCheckmarkCircle, IoCloseCircle, IoImageOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { InformacionCurso } from './Informacion.modl';
import { fetchCurso } from './Informacion.service';


interface Props {
    idCurso: number;
}

const Informacion: React.FC<Props> = ({ idCurso }) => {
    const [imagen, setImagen] = useState<string>();
    const [cursos, setCursos] = useState<InformacionCurso>();

    useEffect(() => {
        if (idCurso === 0) return;
        handleCurso(idCurso);

    }, [idCurso]);

    const handleCurso = async (id: number) => {
        const cursoData = await fetchCurso(id);
        setCursos(cursoData);
        setImagen(cursoData?.imagen || '');
    };

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

        const informacionCurso: InformacionCurso = {
            id: idCurso,
            titulo: values.titulo,
            descripcion: values.descripcion,
            categoria: values.categoria,
            dependencia: values.dependencia,
            imagen: imagen || '',
            aprendera: values.aprendera,
        }

        if (idCurso > 0) {
            console.log("Actualizar : ", informacionCurso);
        } else {
            console.log("Guardar : ", informacionCurso);
        }

    };

    return (
        <div className={style.Informacion}>
            <h2>Información general</h2>
            <div className={style.Informacion_Content}>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        titulo: cursos?.titulo || '',
                        descripcion: cursos?.descripcion || '',
                        categoria: cursos?.categoria || '',
                        dependencia: cursos?.dependencia || '',
                        imagen: '',
                        aprendera: cursos?.aprendera || [],
                        nuevoItem: '',
                    }}
                    validate={(valor) => {
                        let errors: any = {};

                        if (!valor.titulo) {
                            errors.titulo = 'Por favor, ingresa un título para el curso.';
                        }
                        if (!valor.descripcion) {
                            errors.descripcion = 'La descripción es obligatoria. Explica brevemente de qué trata el curso.';
                        }

                        if (valor.categoria == '') {
                            errors.categoria = 'Selecciona una categoría para el curso.';
                        }

                        if (valor.dependencia == '') {
                            errors.dependencia = 'Selecciona la dependencia del curso.';
                        }

                        if (valor.aprendera.length == 0) {
                            errors.aprendera = 'Agrega al menos un aprendizaje que los estudiantes obtendrán en este curso.';
                        }


                        if (!imagen) {
                            errors.imagen = 'Sube una imagen representativa del curso.';
                        }
                        return errors;
                    }}
                    onSubmit={handleRegistrar}
                >
                    {({ errors, values, setFieldValue }) => (
                        <Form>
                            <div className={style.Formulario_Content}>
                                <div className={style.Formulario_Content_Left}>
                                    <div className={style.Formulario_Input}>
                                        <StyledTextField
                                            name="titulo"
                                            label="Nombre del curso"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            placeholder="Escribe el nombre completo del curso, por ejemplo: 'Introducción a la programación en JavaScript'"
                                            value={values.titulo}
                                            onChange={(e) => setFieldValue('titulo', e.target.value)}
                                        />
                                        <ErrorMessage name="titulo" component={() => <p className={style.Error}>{errors.titulo}</p>} />
                                    </div>
                                    <div className={style.Formulario_Input}>
                                        <h3>Descripción</h3>
                                        <StyledTextArea
                                            aria-label="minimum height"
                                            minRows={5}
                                            placeholder="Haz que el curso destaque. Explica de manera clara y atractiva qué aprenderán los estudiantes y por qué deberían inscribirse."
                                            value={values.descripcion}
                                            onChange={(e) => setFieldValue('descripcion', e.target.value)}
                                        />
                                        <ErrorMessage name="descripcion" component={() => <p className={style.Error}>{errors.descripcion}</p>} />
                                    </div>
                                    <div className={style.Formulario_Input}>
                                        <h3>¿Qué aprenderá?</h3>
                                        <div className={style.Formulario_Input_Content}>
                                            <StyledTextField
                                                name="nuevoItem"
                                                label="Aprendizaje"
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                placeholder="Describe lo que aprenderán los estudiantes en este curso"
                                                value={values.nuevoItem || ''}
                                                onChange={(e) => setFieldValue('nuevoItem', e.target.value)}
                                            />
                                            <a
                                                onClick={() => {
                                                    if (values.nuevoItem) {
                                                        setFieldValue('aprendera', [...values.aprendera, values.nuevoItem]);
                                                        setFieldValue('nuevoItem', '');
                                                    }
                                                }}
                                            >
                                                <IoAddCircle />
                                            </a>

                                        </div>
                                        <ErrorMessage name="aprendera" component={() => <p className={style.Error}>{errors.aprendera}</p>} />
                                        <div className={style.Formulario_Input_Content}>
                                            {values.aprendera.length > 0 && (
                                                <ul>
                                                    {values.aprendera.map((item, index) => (
                                                        <li key={index} >
                                                            <div>
                                                                <IoCheckmarkCircle className={style.IconoCheck} />
                                                            </div>

                                                            <div>
                                                                {item}
                                                            </div>
                                                            <div>
                                                                <IoCloseCircle
                                                                    className={style.IconoBorrar}
                                                                    onClick={() => {
                                                                        const updatedItems = values.aprendera.filter((_, i) => i !== index);
                                                                        setFieldValue('aprendera', updatedItems);
                                                                    }}

                                                                />
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={style.Formulario_Content_Right}>
                                    <div className={style.Formulario_Input}>
                                        <div className={style.Formulario_Input_Content}>
                                            <div className={style.Formulario_Input_Content_div}>
                                                <StyledSelect
                                                    id="dependencia"
                                                    select
                                                    label="Dependencia"
                                                    size="small"
                                                    variant="outlined"
                                                    value={values.dependencia}
                                                    onChange={(e) => setFieldValue('dependencia', e.target.value)}
                                                >
                                                    <MenuItem value="1">Facultad de Humanidades</MenuItem>
                                                    <MenuItem value="2">Facultad de Ingeniería</MenuItem>
                                                </StyledSelect>
                                                <ErrorMessage name="dependencia" component={() => <p className={style.Error}>{errors.dependencia}</p>} />
                                            </div>
                                            <div className={style.Formulario_Input_Content_div}>
                                                <StyledSelect
                                                    id="categoria"
                                                    select
                                                    label="Categoría"
                                                    size="small"
                                                    variant="outlined"
                                                    value={values.categoria}
                                                    onChange={(e) => setFieldValue('categoria', e.target.value)}
                                                >
                                                    <MenuItem value="1">Idiomas</MenuItem>
                                                    <MenuItem value="2">Enfermería</MenuItem>
                                                    <MenuItem value="3">Ingeniería</MenuItem>
                                                </StyledSelect>
                                                <ErrorMessage name="categoria" component={() => <p className={style.Error}>{errors.categoria}</p>} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.Formulario_Content_Imagen}>
                                        <h3>Imagen del curso</h3>
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
                                        <ErrorMessage name="imagen" component={() => <p className={style.ErrorImagen}>{errors.imagen}</p>} />
                                    </div>

                                </div>
                            </div>
                            <div className={style.Formulario_Boton}>
                                <button type="submit">{idCurso > 0 ? "Guardar cambios": "Guardar"}</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Informacion;

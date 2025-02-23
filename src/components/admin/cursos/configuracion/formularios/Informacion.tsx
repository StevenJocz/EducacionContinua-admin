"use client"; 
import { StyledSelect, StyledTextArea, StyledTextField } from '@/utils/MaterialUI';
import style from '../Configuracion.module.css';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { MenuItem } from '@mui/material';
import { IoAddCircle, IoCheckmarkCircle, IoCloseCircle, IoImageOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { categoriaCurso, InformacionCurso } from './Informacion.modl';
import { fetchCurso } from './Informacion.service';
import { Dependencia } from '@/components/admin/configuracion/dependencias/Dependencias.model';
import { CategoriaModel } from '@/components/admin/configuracion/categorias/Categoria.model';
import { fetchCategorias } from '@/components/admin/configuracion/categorias/Categoria.service';
import { fetchDependecias } from '@/components/admin/configuracion/dependencias/Dependencias.service';
import api from '@/service/Api.service';
import ButtonSubmit from '@/components/button/ButtonSubmit';
import {useRouter} from 'next/navigation';
import { Imagen } from '../../Cursos.model';


interface Props {
    idCurso: number;
}

const Informacion: React.FC<Props> = ({ idCurso }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imagen, setImagen] = useState<string>();
    const [cursos, setCursos] = useState<InformacionCurso>();
    const [dependencia, setDependencia] = useState<Dependencia[] | null>(null);
    const [categoria, setCategoria] = useState<CategoriaModel[] | null>(null);

    useEffect(() => {
        handleCategoria();
        handleDependencia();
        if (idCurso === 0) return;
        handleCurso(idCurso);

    }, [idCurso]);

    const handleCategoria = async () => {
        const dataFetch: CategoriaModel[] = await fetchCategorias();
        setCategoria(dataFetch);
    };

    const handleDependencia = async () => {
        const dataFetch: Dependencia[] = await fetchDependecias();
        setDependencia(dataFetch);
    };

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

    const handleRegistrar = async (values: FormikValues) => {
        setIsLoading(true);
        const informacionCurso: InformacionCurso = {
            id: idCurso,
            titulo: values.titulo,
            descripcion: values.descripcion,
            categorias: values.categoriaSeleccionada,
            dependencia: values.dependencia,
            imagen: imagen || '',
            dirigido: values.dirigido,
            aprendera: values.aprendera,
        }

        try {
            if (idCurso > 0) {
                console.log("Actualizar : ", informacionCurso);
            } else {
                await api.post('Cursos/Post_Create_Cursos', informacionCurso);
            }
        } catch (error) {
            console.error('Error al registrar:', error);
        } finally {
            setIsLoading(false);
        }
    };

   const router = useRouter();
    const onClose =()=>{
        router.replace('/dashboard/admin/cursos');
    }

    return (
        <div className={style.Informacion}>
            <h2>Información general</h2>
            <div className={style.Informacion_Content}>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        titulo: cursos?.titulo || '',
                        descripcion: cursos?.descripcion || '',
                        categoria: 0,
                        dependencia: cursos?.dependencia || '',
                        imagen: '',
                        dirigido: cursos?.dirigido || '',
                        aprendera: cursos?.aprendera || [],
                        nuevoItem: '',
                        categoriaSeleccionada: cursos?.categorias || [] as categoriaCurso[],
                    }}
                    validate={(valor) => {
                        let errors: any = {};

                        if (!valor.titulo) {
                            errors.titulo = 'Por favor, ingresa un título para el curso.';
                        }
                        if (!valor.descripcion) {
                            errors.descripcion = 'La descripción es obligatoria. Explica brevemente de qué trata el curso.';
                        }

                        if (valor.dependencia == '0') {
                            errors.dependencia = 'Selecciona la dependencia del curso.';
                        }

                        if (valor.dirigido == '') {
                            errors.dirigido = 'Agrega para quienes va dirigido el curso';
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
                    {({ errors, values, setFieldValue, isSubmitting }) => (
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
                                        <StyledTextField
                                            name="dirigido"
                                            label="¿Para quién es este curso?"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            placeholder="Indica el público objetivo, por ejemplo: 'Todo público. No necesita tener conocimientos avanzados previos'"
                                            value={values.dirigido}
                                            onChange={(e) => setFieldValue('dirigido', e.target.value)}
                                        />
                                        <ErrorMessage name="dirigido" component={() => <p className={style.Error}>{errors.dirigido}</p>} />
                                    </div>
                                    <div className={style.Formulario_Input}>
                                        <StyledSelect
                                            id="dependencia"
                                            select
                                            label="Dependencia"
                                            size="small"
                                            variant="outlined"
                                            value={values.dependencia}
                                            onChange={(e) => setFieldValue('dependencia', e.target.value)}
                                        >
                                            <MenuItem value={'0'}>
                                                Seleccione
                                            </MenuItem>

                                            {dependencia && dependencia.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.nombre}
                                                </MenuItem>
                                            ))}
                                        </StyledSelect>
                                        <ErrorMessage name="dependencia" component={() => <p className={style.Error}>{errors.dependencia}</p>} />
                                    </div>
                                    <div className={style.Formulario_Input_Content}>
                                        <StyledSelect
                                            id="categoria"
                                            select
                                            label="Categoría"
                                            size="small"
                                            variant="outlined"
                                            value={values.categoria}
                                            onChange={(e) => {
                                                const categoriaId = Number(e.target.value);
                                                const categoriaSeleccionada = categoria?.find(c => c.id === categoriaId);

                                                if (categoriaSeleccionada && !values.categoriaSeleccionada.some(c => c.id === categoriaId)) {
                                                    setFieldValue('categoriaSeleccionada', [...values.categoriaSeleccionada, categoriaSeleccionada]);
                                                }
                                                setFieldValue('categoria', '0'); 
                                            }}
                                        >
                                            <MenuItem value={'0'}>
                                                Seleccione
                                            </MenuItem>
                                            {categoria?.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.nombre}
                                                </MenuItem>
                                            ))}
                                        </StyledSelect>
                                    </div>
                                    <div className={style.Formulario_Lista_Categorias}>
                                        {values.categoriaSeleccionada.length > 0 && (
                                            <ul>
                                                {values.categoriaSeleccionada?.map((cat, index) => (
                                                    <li key={index} >
                                                        <div>
                                                            <IoCheckmarkCircle className={style.IconoCheck} />
                                                            {cat.nombre}
                                                        </div>
                                                        <div>
                                                            <IoCloseCircle
                                                                className={style.IconoBorrar}
                                                                onClick={() => setFieldValue('categoriaSeleccionada', values.categoriaSeleccionada.filter(c => c.id !== cat.id))}

                                                            />
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <ErrorMessage name="categoria" component={() => <p className={style.Error}>{errors.categoria}</p>} />

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
                                            <img src={`${Imagen.URL}${imagen}`} alt="Vista previa" className={style.Imagen_Preview} />
                                        }
                                        <ErrorMessage name="imagen" component={() => <p className={style.ErrorImagen}>{errors.imagen}</p>} />
                                    </div>

                                </div>
                            </div>
                            <ButtonSubmit
                                id={idCurso}
                                isLoading={isLoading}
                                isSubmitting={isSubmitting}
                                onClose={onClose}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Informacion;

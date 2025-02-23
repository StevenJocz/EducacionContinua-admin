import { IoArrowBack, IoBook, IoBookOutline, IoCloudDownloadOutline, IoPencil, IoPersonCircleOutline, IoRibbonOutline } from 'react-icons/io5';
import style from './Perfil.module.css'
import { useEffect, useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { StyledSelect, StyledTextField } from '@/utils/MaterialUI';
import { MenuItem } from '@mui/material';
import Image from 'next/image';
import { blurImagen } from '@/models';
import { InformacionEstudiante } from './Perfil.model';
import { fetchEstudianteID } from './Perfil.service';

interface Props {
    id: number;
    onClose: () => void;
}

const Perfil: React.FC<Props> = ({ id, onClose }) => {
    const [menu, setMenu] = useState(3);
    const [data, setData] = useState<InformacionEstudiante | null>(null)

    useEffect(() => {
        if (id === 0) return;
        handleData(id);
    }, []);


    const handleData = (id: number) => {
        const dataFetch = fetchEstudianteID(id);
        setData(dataFetch[0]);
    }


    const handleMenu = (menu: number) => {
        setMenu(menu);
    }

    const handleActualizar = () => { }

    return (
        <div className={style.Perfil}>
            <div className={style.Perfil_Header}>
                <button onClick={onClose}><IoArrowBack /> Volver a la  lista</button>
                <p>Este es el perfil del estudiante. Aquí encontrarás su información detallada.</p>
            </div>
            <div className={style.Perfil_Body}>
                <div className={style.Perfil_Body_Foto}>
                    <div className={style.Body_Foto}>
                        <img src={data?.estudiante.imagen} alt="" />
                        <h2>{data?.estudiante.nombres}</h2>
                        <h2>{data?.estudiante.apellidos}</h2>
                        <h3>{data?.estudiante.tipoDocumento} - {data?.estudiante.documento}</h3>
                        <h3>{data?.estudiante.correo}</h3>
                        <button onClick={() => handleMenu(3)}> <IoPencil /> Editar información</button>
                    </div>
                </div>
                <div className={style.Perfil_Body_Informacion}>
                    {menu == 1 ? (
                        <div className={style.Body_Informacion_Cursos}>
                            <h2>Cursos</h2>
                            <div className={style.Informacion_Cursos_Content}>
                                {data?.cursos.map((curso) => (
                                    <div key={curso.id} className={style.CursosCard}>
                                        <Image
                                            src={curso.imagen}
                                            alt={curso.titulo}
                                            width={300}
                                            height={200}
                                            placeholder={blurImagen}
                                            blurDataURL="data:image/svg+xml;base64,..."
                                        />
                                        <h2 className={style.title}>{curso.titulo}</h2>
                                        <p>{curso.codigo}</p>
                                        <div className={style.CursosCard_Progreso}>
                                            <h5>Progreso {curso.progreso}%</h5>
                                            <div className={style.Progreso}>
                                                <div
                                                    className={style.Progreso_inner}
                                                    style={{ width: `${curso.progreso}%` }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : menu == 2 ? (
                        <div className={style.Body_Informacion_Certificados}>
                            <h2>Certificados</h2>
                            <div className={style.Certificados_Content}>
                                {data?.certificados.map((certificado) => (
                                    <div key={certificado.id} className={style.Certificados_Card}>
                                        <h3>{certificado.titulo}</h3>
                                        <Image
                                            src={certificado.imagen}
                                            alt={certificado.titulo}
                                            width={480}
                                            height={340}
                                            placeholder={blurImagen}
                                            blurDataURL="data:image/svg+xml;base64,..."
                                        />
                                        <button>
                                            <IoCloudDownloadOutline /> Descargar
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className={style.Body_Informacion_Formulario}>
                            <h2>Información</h2>
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    correo: data?.estudiante.correo || '',
                                    apellidos: data?.estudiante.apellidos || '',
                                    nombres: data?.estudiante.nombres || '',
                                    tipoDocumento: data?.estudiante.tipoDocumento || '',
                                    documento: data?.estudiante.documento || '',
                                    celular: data?.estudiante.celular || '',
                                    genero: data?.estudiante.genero || '',
                                    pais: data?.estudiante.pais || '',
                                    departamento: data?.estudiante.departamento || '',
                                    ciudad: data?.estudiante.ciudad || '',
                                    tipoVia: data?.estudiante.tipoVia || '',
                                    Numero1: data?.estudiante.numero1 || '',
                                    Numero2: data?.estudiante.numero2 || '',
                                    Numero3: data?.estudiante.numero3 || '',

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

                                    if (!values.pais) {
                                        errors.pais = 'El campo país es obligatorio.';
                                    }

                                    if (!values.departamento) {
                                        errors.departamento = 'El campo departamento es obligatorio.';
                                    }

                                    if (!values.ciudad) {
                                        errors.ciudad = 'El campo ciudad es obligatorio.';
                                    }

                                    if (!values.tipoVia) {
                                        errors.tipoVia = 'El campo tipo de vía es obligatorio.';
                                    }

                                    if (!values.Numero1) {
                                        errors.Numero1 = 'Campo obligatorio.';
                                    }

                                    if (!values.Numero2) {
                                        errors.Numero2 = 'Campo obligatorio.';
                                    }

                                    if (!values.Numero3) {
                                        errors.Numero3 = 'Campo obligatorio.';
                                    }



                                    return errors;
                                }}
                                onSubmit={handleActualizar}
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
                                        <div className={style.Formulario_Titulo}>
                                            <h3>Residencia</h3>
                                        </div>
                                        <div className={style.Formulario}>
                                            <StyledSelect
                                                id="outlined-select-currency"
                                                select
                                                label="Pais"
                                                size="small"
                                                variant="outlined"
                                                value={values.pais}
                                                onChange={(e) => {
                                                    setFieldValue('pais', e.target.value)
                                                }}
                                            >
                                                <MenuItem value='0'>
                                                    Seleccione
                                                </MenuItem>


                                            </StyledSelect>
                                            <ErrorMessage name='pais' component={() => <p className={style.Error}>{errors.pais}</p>} />
                                        </div>
                                        <div className={style.Formulario_Dos}>
                                            <div>
                                                <StyledTextField
                                                    id="outlined-select-currency"
                                                    select
                                                    label="Departamento"
                                                    size="small"
                                                    variant="outlined"
                                                    value={values.departamento}
                                                    onChange={(e) => {
                                                        setFieldValue('departamento', e.target.value)
                                                    }}
                                                >
                                                    <MenuItem value='0'>
                                                        Seleccione
                                                    </MenuItem>

                                                </StyledTextField>
                                                <ErrorMessage name='departamento' component={() => <p className={style.Error}>{errors.departamento}</p>} />
                                            </div>
                                            <div>
                                                <StyledSelect
                                                    id="outlined-select-currency"
                                                    select
                                                    label="Ciudad"
                                                    size="small"
                                                    variant="outlined"
                                                    value={values.ciudad}
                                                    onChange={(e) => setFieldValue('ciudad', e.target.value)}
                                                >
                                                    <MenuItem value='0'>
                                                        Seleccione
                                                    </MenuItem>

                                                </StyledSelect>
                                                <ErrorMessage name='ciudad' component={() => <p className={style.Error}>{errors.ciudad}</p>} />
                                            </div>
                                        </div>
                                        <div className={style.Formulario}>
                                            <StyledSelect
                                                id="outlined-select-currency"
                                                select
                                                name='tipoVia'
                                                label="Tipo de vía"
                                                size="small"
                                                variant="outlined"
                                                value={values.tipoVia}
                                                onChange={(e) => {
                                                    setFieldValue('tipoVia', e.target.value)
                                                }}
                                            >
                                                <MenuItem value={'0'}>
                                                    Seleccione
                                                </MenuItem>

                                            </StyledSelect>
                                            <ErrorMessage name='tipoVia' component={() => <p className={style.Error}>{errors.tipoVia}</p>} />
                                        </div>
                                        <div className={style.Formulario_Dos}>
                                            <div>
                                                <StyledTextField
                                                    name='Numero1'
                                                    variant="outlined"
                                                    size="small"
                                                    placeholder='Ej: 32C'
                                                    value={values.Numero1}
                                                    onChange={(e) => setFieldValue('Numero1', e.target.value)}
                                                />

                                                <ErrorMessage name='Numero1' component={() => <p className={style.Error}>{errors.Numero1}</p>} />
                                            </div>
                                            <h5>#</h5>
                                            <div>
                                                <StyledTextField
                                                    name='Numero2'
                                                    variant="outlined"
                                                    size="small"
                                                    placeholder='45'
                                                    value={values.Numero2}
                                                    onChange={(e) => setFieldValue('Numero2', e.target.value)}
                                                />
                                                <ErrorMessage name='Numero2' component={() => <p className={style.Error}>{errors.Numero2}</p>} />
                                            </div>
                                            <h5>-</h5>
                                            <div>
                                                <StyledTextField
                                                    name='Numero3'
                                                    variant="outlined"
                                                    size="small"
                                                    placeholder='116'
                                                    value={values.Numero3}
                                                    onChange={(e) => setFieldValue('Numero3', e.target.value)}
                                                />
                                                <ErrorMessage name='Numero3' component={() => <p className={style.Error}>{errors.Numero3}</p>} />
                                            </div>
                                        </div>
                                        <div className={style.Formulario_Boton}>
                                            <button type='submit'>Actualizar información</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}
                </div>
                <div className={style.Perfil_Body_Menu}>
                    <ul>
                        <li onClick={() => handleMenu(1)} className={menu === 1 ? style.Seleccionado : ""}>
                            <IoBookOutline /> Cursos
                        </li>
                        <li onClick={() => handleMenu(2)} className={menu === 2 ? style.Seleccionado : ""}>
                            <IoRibbonOutline /> Certificados
                        </li>
                        <li onClick={() => handleMenu(3)} className={menu === 3 ? style.Seleccionado : ""}>
                            <IoPersonCircleOutline /> Información
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Perfil
"use client";
import Link from 'next/link'
import style from './Inscripcion.module.css'
import { ErrorMessage, Form, Formik } from 'formik';
import { StyledSelect, StyledTextField } from '@/utils/MaterialUI';
import { MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';
import Image from 'next/image';
import stroke from '../../../public/svg/stroke.svg'
import { useParams } from 'next/navigation';
import { CursoInscripion } from './Inscripcion.model';
import { fetchCuponDescuento, fetchCursoID } from './Inscripcion.service';
import { Routes } from '@/models';

const Inscripcion = () => {
    const { inscripcion } = useParams();
    const decoded = Buffer.from(inscripcion as string, 'base64').toString();
    const [id, vendedor] = decoded.split('|');

    const [curso, setCurso] = useState<CursoInscripion[]>([])

    useEffect(() => {
        handleCurso(parseInt(id), parseInt(vendedor));

    }, [id, vendedor]);

    const handleCurso = async (id: number, vendedor: number) => {
        const cursoData = await fetchCursoID(id, vendedor);
        console.log(cursoData);
        setCurso(cursoData);
    };

    const [opcionFactura, setOpcionFactura] = useState(true)

    const handleOpcionFactura = (opcion: boolean) => {
        setOpcionFactura(opcion)
    }

    const [tengoCupon, setTengoCupon] = useState(false);

    const handleTengoCupon = (opcion: boolean) => {
        setTengoCupon(opcion)
    }

    const [codigo, setCodigo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [descuento, setDescuento] = useState(0);

    const aplicarCupon = async () => {
        const respuesta = await fetchCuponDescuento(parseInt(id), codigo);
        setMensaje(respuesta.mensaje);
        setDescuento(respuesta.descuento);
    };

    const handleFinalizarCompra = () => { }

    return (
        <div className={style.Inscripcion}>
            <div className={style.Inscripcion_Header}>
                <Link href={Routes.HOME.path}>
                    <img src="https://www.unac.edu.co/wp-content/uploads/2022/07/LOGO_UNAC_BLANCO.webp" alt="" />
                </Link>
            </div>
            <div className={style.Inscripcion_Content}>
                <div className={style.Inscripcion_Formulario}>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            correo: '',
                            apellidos: '',
                            nombres: '',
                            tipoDocumento: '',
                            documento: '',
                            celular: '',
                            genero: '',
                            pais: '',
                            departamento: '',
                            ciudad: '',
                            tipoVia: '',
                            Numero1: '',
                            Numero2: '',
                            Numero3: '',
                            correoFactura: '',
                            apellidosFactura: '',
                            nombresFactura: '',
                            tipoDocumentoFactura: '',
                            documentoFactura: '',
                            celularFactura: '',
                            generoFactura: '',
                            paisFactura: '',
                            departamentoFactura: '',
                            ciudadFactura: '',
                            tipoViaFactura: '',
                            Numero1Factura: '',
                            Numero2Factura: '',
                            Numero3Factura: '',
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

                            if (!opcionFactura) {
                                if (!values.correoFactura) {
                                    errors.correoFactura = 'El campo correo Factura es obligatorio.';
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.correoFactura)) {
                                    errors.correoFactura = 'Correo inválido.';
                                }

                                if (!values.apellidosFactura) {
                                    errors.apellidosFactura = 'El campo apellidos es obligatorio.';
                                } else if (values.apellidosFactura.length < 2) {
                                    errors.apellidosFactura = 'Debe contener al menos 2 caracteres.';
                                } else if (!nameRegex.test(values.apellidosFactura)) {
                                    errors.apellidosFactura = 'Solo se permiten letras.';
                                }

                                if (!values.nombresFactura) {
                                    errors.nombresFactura = 'El campo nombres es obligatorio.';
                                } else if (values.nombresFactura.length < 2) {
                                    errors.nombresFactura = 'Debe contener al menos 2 caracteres.';
                                } else if (!nameRegex.test(values.nombresFactura)) {
                                    errors.nombresFactura = 'Solo se permiten letras.';
                                }

                                if (!values.tipoDocumentoFactura) {
                                    errors.tipoDocumentoFactura = 'El campo tipo de documento es obligatorio.';
                                }

                                if (values.documentoFactura) {
                                    const numericDocuments = ['1', '2']; // Tipos de documentos que solo permiten números
                                    const alphanumericDocuments = ['3', '5', '16']; // Tipos de documentos que permiten letras y números

                                    if (numericDocuments.includes(values.tipoDocumentoFactura.toString())) {
                                        if (!numericRegex.test(values.documentoFactura)) {
                                            errors.documentoFactura = 'El documento solo puede contener números.';
                                        }
                                    } else if (alphanumericDocuments.includes(values.tipoDocumentoFactura.toString())) {
                                        if (!alphanumericRegex.test(values.documentoFactura)) {
                                            errors.documentoFactura = 'El documento solo puede contener letras y números.';
                                        }
                                    } else {
                                        errors.documentoFactura = 'Tipo de documento no válido.';
                                    }
                                } else {
                                    errors.documentoFactura = 'El campo documento es obligatorio.';
                                }

                                if (!values.celularFactura) {
                                    errors.celularFactura = 'El campo celular es obligatorio.';
                                } else if (!/^\d{10}$/.test(values.celularFactura)) {
                                    errors.celularFactura = 'El celular debe contener 10 dígitos númericos.';
                                }

                                if (!values.generoFactura) {
                                    errors.generoFactura = 'El campo género es obligatorio.';
                                }

                                if (!values.paisFactura) {
                                    errors.paisFactura = 'El campo país es obligatorio.';
                                }

                                if (!values.departamentoFactura) {
                                    errors.departamentoFactura = 'El campo departamento es obligatorio.';
                                }

                                if (!values.ciudadFactura) {
                                    errors.ciudadFactura = 'El campo ciudad es obligatorio.';
                                }

                                if (!values.tipoViaFactura) {
                                    errors.tipoViaFactura = 'El campo tipo de vía es obligatorio.';
                                }

                                if (!values.Numero1Factura) {
                                    errors.Numero1Factura = 'Campo obligatorio.';
                                }

                                if (!values.Numero2Factura) {
                                    errors.Numero2Factura = 'Campo obligatorio.';
                                }

                                if (!values.Numero3Factura) {
                                    errors.Numero3Factura = 'Campo obligatorio.';
                                }
                            }

                            return errors;
                        }}
                        onSubmit={handleFinalizarCompra}
                    >
                        {({ errors, values, setFieldValue, isSubmitting }) => (
                            <Form>
                                <div className={style.TextoInformativo}>
                                    <p><span> <IoAlertCircleOutline /></span>  Si vas a inscribir a un menor de edad o regalar este curso a otra persona, ten en cuenta que el primer formulario es para los datos del estudiante. Selecciona la opción "Usar una dirección de facturación distinta" para asegurarte de que la factura quede a tu nombre.</p>
                                </div>
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
                                <div className={style.Opcion_Faturacion}>
                                    <div className={style.Opcion_Faturacion_Div}
                                        onClick={() => handleOpcionFactura(true)}
                                    >

                                        <div className={style.Opcion_Faturacion_Div_Circulo}>
                                            {opcionFactura &&
                                                <div></div>
                                            }

                                        </div>
                                        <p>La misma dirección de envío</p>
                                    </div>
                                    <div className={style.Opcion_Faturacion_Div}
                                        onClick={() => handleOpcionFactura(false)}
                                    >
                                        <div className={style.Opcion_Faturacion_Div_Circulo}>
                                            {!opcionFactura &&
                                                <div></div>
                                            }
                                        </div>
                                        <p>Usar una dirección de facturación distinta</p>
                                    </div>
                                    {!opcionFactura &&
                                        <>
                                            <div className={style.Formulario}>
                                                <div className={style.Formulario_Titulo}>
                                                    <h3>Datos de facturación</h3>
                                                </div>
                                                <StyledTextField
                                                    name='correoFactura'
                                                    variant="outlined"
                                                    size="small"
                                                    label="Correo electrónico"
                                                    placeholder='Correo electrónico'
                                                    value={values.correoFactura}
                                                    onChange={(e) => setFieldValue('correoFactura', e.target.value)}
                                                />
                                                <ErrorMessage name='correoFactura' component={() => <p className={style.Error}>{errors.correoFactura}</p>} />
                                            </div>
                                            <div className={style.Formulario_Dos}>
                                                <div>
                                                    <StyledTextField
                                                        name='nombresFactura'
                                                        label="Nombres"
                                                        variant="outlined"
                                                        size="small"
                                                        placeholder='Introduce nombres completos'
                                                        value={values.nombresFactura}
                                                        onChange={(e) => setFieldValue('nombresFactura', e.target.value)}
                                                    />
                                                    <ErrorMessage name='nombresFactura' component={() => <p className={style.Error}>{errors.nombresFactura}</p>} />
                                                </div>
                                                <div>
                                                    <StyledTextField
                                                        name='apellidosFactura'
                                                        label="Apellidos"
                                                        variant="outlined"
                                                        size="small"
                                                        placeholder='Introduce apellidos completos'
                                                        value={values.apellidosFactura}
                                                        onChange={(e) => setFieldValue('apellidosFactura', e.target.value)}
                                                    />
                                                    <ErrorMessage name='apellidosFactura' component={() => <p className={style.Error}>{errors.apellidosFactura}</p>} />
                                                </div>
                                            </div>
                                            <div className={style.Formulario_Dos}>
                                                <div>
                                                    <StyledSelect
                                                        label="Tipo de documento"
                                                        size="small"
                                                        variant="outlined"
                                                        value={values.tipoDocumentoFactura}
                                                        onChange={(e) => setFieldValue('tipoDocumentoFactura', e.target.value)}
                                                    >
                                                        <MenuItem value='0'>Seleccione</MenuItem>
                                                    </StyledSelect>
                                                    <ErrorMessage name='tipoDocumentoFactura' component={() => <p className={style.Error}>{errors.tipoDocumentoFactura}</p>} />
                                                </div>
                                                <div>
                                                    <StyledTextField
                                                        name='documentoFactura'
                                                        label="Número de documento"
                                                        variant="outlined"
                                                        size="small"
                                                        placeholder='Introduce número de documento'
                                                        value={values.documentoFactura}
                                                        onChange={(e) => setFieldValue('documentoFactura', e.target.value)}
                                                    />
                                                    <ErrorMessage name='documentoFactura' component={() => <p className={style.Error}>{errors.documentoFactura}</p>} />
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
                                                        value={values.generoFactura}
                                                        onChange={(e) => setFieldValue('generoFactura', e.target.value)}
                                                    >
                                                        <MenuItem value='0'>
                                                            Seleccione
                                                        </MenuItem>

                                                    </StyledSelect>
                                                    <ErrorMessage name='generoFactura' component={() => <p className={style.Error}>{errors.generoFactura}</p>} />
                                                </div>
                                                <div>
                                                    <StyledTextField
                                                        name='celularFactura'
                                                        label="Número de celular"
                                                        variant="outlined"
                                                        size="small"
                                                        placeholder='Introduce número de celular'
                                                        value={values.celularFactura}
                                                        onChange={(e) => setFieldValue('celularFactura', e.target.value)}
                                                    />
                                                    <ErrorMessage name='celularFactura' component={() => <p className={style.Error}>{errors.celularFactura}</p>} />
                                                </div>
                                            </div>
                                            <div className={style.Formulario}>
                                                <StyledSelect
                                                    label="País"
                                                    size="small"
                                                    variant="outlined"
                                                    value={values.paisFactura}
                                                    onChange={(e) => setFieldValue('paisFactura', e.target.value)}
                                                >
                                                    <MenuItem value='0'>Seleccione</MenuItem>
                                                </StyledSelect>
                                                <ErrorMessage name='paisFactura' component={() => <p className={style.Error}>{errors.paisFactura}</p>} />
                                            </div>
                                            <div className={style.Formulario_Dos}>

                                                <div>
                                                    <StyledSelect
                                                        label="Departamento"
                                                        size="small"
                                                        variant="outlined"
                                                        value={values.departamentoFactura}
                                                        onChange={(e) => setFieldValue('departamentoFactura', e.target.value)}
                                                    >
                                                        <MenuItem value='0'>Seleccione</MenuItem>
                                                    </StyledSelect>
                                                    <ErrorMessage name='departamentoFactura' component={() => <p className={style.Error}>{errors.departamentoFactura}</p>} />
                                                </div>
                                                <div>
                                                    <StyledSelect
                                                        label="Ciudad "
                                                        size="small"
                                                        variant="outlined"
                                                        value={values.ciudadFactura}
                                                        onChange={(e) => setFieldValue('ciudadFactura', e.target.value)}
                                                    >
                                                        <MenuItem value='0'>Seleccione</MenuItem>
                                                    </StyledSelect>
                                                    <ErrorMessage name='ciudadFactura' component={() => <p className={style.Error}>{errors.ciudadFactura}</p>} />
                                                </div>
                                            </div>
                                            <div className={style.Formulario}>
                                                <StyledSelect
                                                    id="outlined-select-currency"
                                                    select
                                                    name='tipoViaFactura'
                                                    label="Tipo de vía"
                                                    size="small"
                                                    variant="outlined"
                                                    value={values.tipoViaFactura}
                                                    onChange={(e) => {
                                                        setFieldValue('tipoViaFactura', e.target.value)
                                                    }}
                                                >
                                                    <MenuItem value={'0'}>
                                                        Seleccione
                                                    </MenuItem>

                                                </StyledSelect>
                                                <ErrorMessage name='tipoViaFactura' component={() => <p className={style.Error}>{errors.tipoViaFactura}</p>} />
                                            </div>
                                            <div className={style.Formulario_Dos}>
                                                <div>
                                                    <StyledTextField
                                                        name='Numero1Factura'
                                                        variant="outlined"
                                                        size="small"
                                                        placeholder='Ej: 32C'
                                                        value={values.Numero1Factura}
                                                        onChange={(e) => setFieldValue('Numero1Factura', e.target.value)}
                                                    />
                                                    <ErrorMessage name='Numero1Factura' component={() => <p className={style.Error}>{errors.Numero1Factura}</p>} />
                                                </div>
                                                <h5>#</h5>
                                                <div>
                                                    <StyledTextField
                                                        name='Numero2Factura'
                                                        variant="outlined"
                                                        size="small"
                                                        placeholder='Ej: 45'
                                                        value={values.Numero2Factura}
                                                        onChange={(e) => setFieldValue('Numero2Factura', e.target.value)}
                                                    />
                                                    <ErrorMessage name='Numero2Factura' component={() => <p className={style.Error}>{errors.Numero2Factura}</p>} />
                                                </div>
                                                <h5>-</h5>
                                                <div>
                                                    <StyledTextField
                                                        name='Numero3Factura'
                                                        variant="outlined"
                                                        size="small"
                                                        placeholder='Ej: 116'
                                                        value={values.Numero3Factura}
                                                        onChange={(e) => setFieldValue('Numero3Factura', e.target.value)}
                                                    />
                                                    <ErrorMessage name='Numero3Factura' component={() => <p className={style.Error}>{errors.Numero3Factura}</p>} />
                                                </div>
                                            </div>


                                        </>
                                    }
                                </div>
                                <div className={style.Formulario_Titulo}>
                                    <h3>Métodos de pago</h3>
                                </div>
                                <div className={style.Formulario_MetodosPago}>
                                    <img src="https://www.acuavalle.gov.co/wp-content/uploads/2024/02/LOGOGOU.png" alt="" />
                                    <img src="https://edteam-media.s3.amazonaws.com/cashboxes/co/colombia-bancolombia-dark.svg" alt="" />
                                    <img src="https://edteam-media.s3.amazonaws.com/cashboxes/co/colombia-ach-pse-dark.svg" alt="" />
                                    <img src="https://edteam-media.s3.amazonaws.com/cashboxes/usd/visa-dark.svg" alt="" />
                                    <img src="https://edteam-media.s3.amazonaws.com/cashboxes/usd/mastercard-dark.svg" alt="" />
                                    <img src="https://edteam-media.s3.amazonaws.com/cashboxes/usd/americanexpress-dark.svg" alt="" />
                                </div>
                                <div className={style.Formulario_DatosPersonales}>
                                    <p> Al dar clic en Pagar ahora, aceptas la  <a
                                        href="https://www.unac.edu.co/wp-content/uploads/2021/10/2.-Politica-de-Proteccion-de-Datos-Personales.pdf"
                                        target='_blanck'
                                    >
                                        protección de datos personales
                                    </a>, las condiciones y declaro que toda información proporcionada es verídica.</p>
                                </div>
                                <div className={style.Formulario_Boton}>
                                    <button type='submit'>Pagar ahora</button>
                                </div>


                            </Form>
                        )}
                    </Formik>

                </div>
                <div className={style.Inscripcion_Informacion}>
                    {curso.length > 0 && curso[0]?.imagen ? (
                        <>
                            <div className={style.Informacion_Curso}>
                                <Image
                                    src={curso[0]?.imagen}
                                    alt={curso[0]?.titulo}
                                    width={550}
                                    height={270}
                                    placeholder="blur"
                                    blurDataURL="data:image/svg+xml;base64,..."
                                />
                                <div>
                                    <h2>{curso[0]?.titulo}</h2>
                                    <h4>Prof. {curso[0]?.instructor}</h4>
                                    <p><span>${curso[0]?.precio.toLocaleString()} </span>${(curso[0]?.precio - curso[0]?.descuento).toLocaleString()} COP</p>
                                </div>
                            </div>
                            {tengoCupon ? (
                                <div className={style.Informacion_Cupon}>
                                    <StyledTextField
                                        name='cupon'
                                        variant="outlined"
                                        size="small"
                                        placeholder='Ingresa tu cupón'
                                        value={codigo}
                                        onChange={(e) => setCodigo(e.target.value)}
                                    />
                                    <button onClick={aplicarCupon}>Aplicar Cupón</button>

                                </div>
                            ) : (<div className={style.Informacion_Cupon_Tengo}>
                                <button onClick={() => handleTengoCupon(true)}>Tengo un Cupón</button>
                            </div>)
                            }

                            {mensaje && <p className={style.Cupon_mensaje}>{mensaje}</p>}

                            <div className={style.Informacion_Totales}>
                                <div>
                                    <h5>Subtotal<span> • 1 curso</span> </h5>
                                    <h4>${curso[0]?.precio.toLocaleString()} COP</h4>
                                </div>
                                <div>
                                    <h5>Descuento</h5>
                                    <h4>-${curso[0]?.descuento.toLocaleString()} COP</h4>
                                </div>

                                <div>
                                    <h5>Cupon</h5>
                                    {descuento == 0 ? (
                                        <h4>0 COP</h4>
                                    ) : (
                                        <h4>-${descuento.toLocaleString()} COP</h4>
                                    )}

                                </div>


                                <div>
                                    <h5>Total</h5>
                                    <h4>${(curso[0]?.precio - curso[0]?.descuento - descuento).toLocaleString()} COP</h4>
                                </div>
                                <p>Incluye ${Math.round((curso[0]?.precio - curso[0]?.descuento - descuento) * (curso[0]?.impuesto / 100)).toLocaleString()} de impuestos</p>
                            </div>
                        </>
                    ) : null}

                </div>

            </div>
            <Image
                src={stroke}
                alt="Imagen de fondo"
                className={style.ImagenFondo}
                width={800}
                height={800}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,..."
            />
        </div>
    )
}

export default Inscripcion
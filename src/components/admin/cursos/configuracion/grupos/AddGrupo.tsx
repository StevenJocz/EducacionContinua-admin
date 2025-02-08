import { IoCloseCircle } from 'react-icons/io5';
import style from './Grupos.module.css'
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { StyledDatePicker, StyledTextField } from '@/utils/MaterialUI';
import { useEffect, useState } from 'react';
import { GrupoModel } from './Grupos.model';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { InputAdornment } from '@mui/material';
import { formatPrice } from '@/utils/FormatearPrecio';
import { fetchIdGrupo } from './Grupos.service';
import dayjs from 'dayjs';

interface Props {
    idCurso: number;
    idGrupo: number;
    onClose: () => void;
}

const AddGrupo: React.FC<Props> = ({ idCurso, idGrupo, onClose }) => {
    const [grupo, setGrupo] = useState<GrupoModel>();

    useEffect(() => {
        if (idGrupo === 0) return;
        handleGrupo(idGrupo);

    }, [idGrupo]);

    const handleGrupo = async (id: number) => {
        const grupoData = await fetchIdGrupo(id);
        setGrupo(grupoData);
    };

    const handleRegistrar = (values: FormikValues) => {
        const informacionGrupo: GrupoModel = {
            id: idGrupo,
            nombre: values.nombre,
            fechaInicio: values.fechaInicio,
            fechaFin: values.fechaFin,
            precio: values.precio,
            estado: values.estado,
        }

        if (idGrupo > 0) {
            console.log("Actualizar : ", informacionGrupo);
        } else {
            console.log("Guardar : ", informacionGrupo);
        }
    };

    return (
        <div className={style.AddGrupo}>
            <div className={style.AddGrupo_Content}>
                <div className={style.AddGrupo_Content_Encabezado}>
                    <h2>Módulos</h2>
                    <IoCloseCircle
                        className={style.AddGrupo_Content_Encabezado_Icono}
                        onClick={onClose}
                    />
                </div>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        nombre: grupo?.nombre || '',
                        fechaInicio: grupo?.fechaInicio ? dayjs(grupo.fechaInicio) : null,
                        fechaFin: grupo?.fechaFin ? dayjs(grupo.fechaFin) : null,
                        precio: formatPrice(grupo?.precio || "0") || '',
                        estado: grupo?.estado || '',
                    }}
                    onSubmit={handleRegistrar}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <div className={style.Formulario_Input}>
                                <StyledTextField
                                    name="nombre"
                                    label="Nombre del grupo"
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    placeholder="Escribe el nombre del grupo"
                                    value={values.nombre}
                                    onChange={(e) => setFieldValue('nombre', e.target.value)}
                                />
                                <ErrorMessage
                                    name="nombre"
                                    component={() => <p className={style.Error}>{values.nombre}</p>}
                                />
                            </div>
                            <div className={style.Formulario_Input_Div}>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <StyledDatePicker
                                            label="FECHA DE INICIO"
                                            value={values.fechaInicio}
                                            onChange={(date) => setFieldValue('fechaInicio', date)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <StyledDatePicker
                                            label="FECHA FIN"
                                            value={values.fechaFin}
                                            onChange={(date) => setFieldValue('fechaFin', date)}
                                        />

                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div className={style.Formulario_Input}>
                                <StyledTextField
                                    name="precio"
                                    label="Precio"
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    placeholder="000.000"
                                    value={values.precio}
                                    onChange={(e) => {
                                        const formattedValue = formatPrice(e.target.value);
                                        setFieldValue('precio', formattedValue);
                                    }}
                                    slotProps={{
                                        input: {
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        },
                                    }}
                                />
                                <ErrorMessage
                                    name="precio"
                                    component={() => <p className={style.Error}>{values.precio}</p>}
                                />
                            </div>


                            <div className={style.Formulario_Boton}>
                                <button type="submit">{idGrupo ? 'Guardar Cambios' : 'Registrar Grupo'}</button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}

export default AddGrupo
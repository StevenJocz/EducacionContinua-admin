import { useEffect, useState } from 'react';
import { CuponesModel } from './Cupones.model';
import style from './Cupones.module.css'
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { IoCloseCircle } from 'react-icons/io5';
import { StyledDatePicker, StyledTextField } from '@/utils/MaterialUI';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fetchIdCupon } from './Cupones.service';

interface Props {
    idCurso: number;
    idCupon: number;
    onClose: () => void;
}
const AddCupones: React.FC<Props> = ({ idCurso, idCupon, onClose }) => {
    const [cupon, setCupon] = useState<CuponesModel>();

    useEffect(() => {
        if (idCupon === 0) return;
        handleCupon(idCupon);

    }, [idCupon]);

    const handleCupon = async (id: number) => {
        const cuponData = await fetchIdCupon(id);
        setCupon(cuponData);
    };

    const handleRegistrar = (values: FormikValues) => {
        const informacionGrupo: CuponesModel = {
            id: idCupon,
            titulo: values.titulo,
            codigo: values.codigo,
            fechaInicio: values.fechaInicio,
            fechaFin: values.fechaFin,
            descuento: values.descuento,
            estado: values.estado,
        }

        if (idCupon > 0) {
            console.log("Actualizar : ", informacionGrupo);
        } else {
            console.log("Guardar : ", informacionGrupo);
        }
    };

    return (
        <div className={style.AddCupones}>
            <div className={style.AddCupones_Content}>
                <div className={style.AddCupones_Content_Encabezado}>
                    <h2>Módulos</h2>
                    <IoCloseCircle
                        className={style.AddCupones_Content_Encabezado_Icono}
                        onClick={onClose}
                    />
                </div>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        titulo: cupon?.titulo || '',
                        codigo: cupon?.codigo || '',
                        fechaInicio: cupon?.fechaInicio ? dayjs(cupon.fechaInicio) : null,
                        fechaFin: cupon?.fechaFin ? dayjs(cupon.fechaFin) : null,
                        descuento: cupon?.descuento || '',
                        estado: cupon?.estado || '',
                    }}
                    onSubmit={handleRegistrar}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <div className={style.Formulario_Input}>
                                <StyledTextField
                                    name="titulo"
                                    label="Título del cupón"
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    placeholder="Escribe el título del cupon"
                                    value={values.titulo}
                                    onChange={(e) => setFieldValue('titulo', e.target.value)}
                                />
                                <ErrorMessage
                                    name="titulo"
                                    component={() => <p className={style.Error}>{values.titulo}</p>}
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
                            <div className={style.Formulario_Input_Div}>
                                <div className={style.Formulario_Input}>
                                    <StyledTextField
                                        name="descuento"
                                        label="Descuento"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        placeholder="%00"
                                        value={values.descuento}
                                        onChange={(e) => {
                                            setFieldValue('descuento', e.target.value);
                                        }}
                                    />
                                    <ErrorMessage
                                        name="descuento"
                                        component={() => <p className={style.Error}>{values.descuento}</p>}
                                    />
                                </div>
                                <div className={style.Formulario_Input}>
                                    <StyledTextField
                                        name="codigo"
                                        label="Código del cupón"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        placeholder="Escribe el código del cupón"
                                        value={values.codigo}
                                        onChange={(e) => setFieldValue('codigo', e.target.value)}
                                    />
                                    <ErrorMessage
                                        name="codigo"
                                        component={() => <p className={style.Error}>{values.codigo}</p>}
                                    />
                                </div>
                            </div>

                            <div className={style.Formulario_Boton}>
                                <button type="submit">{idCupon ? 'Guardar Cambios' : 'Registrar Cupon'}</button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}

export default AddCupones
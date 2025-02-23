import { useEffect, useState } from 'react';
import style from './AddConvenio.module.css'
import { ConvenioIdModel, ConvenioRegistrosModel } from './AddConvenio.model';
import { fetchIdConvenio } from './AddConvenio.service';
import { IoArrowBack, IoCloudUpload } from 'react-icons/io5';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { StyledDatePicker, StyledSelect, StyledTextArea, StyledTextField } from '@/utils/MaterialUI';
import { MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { importarExcel, mapConvenioRegistros } from '@/utils/ImportarExcel';
import { Tabla } from '@/components/tabla';
import dayjs from 'dayjs';
import ButtonSubmit from '@/components/button/ButtonSubmit';
import api from '@/service/Api.service';
import { ListCurso } from '../../cursos/Cursos.model';
import { fetchListaCursos } from '../../cursos/Cursos.service';

interface Props {
  id: number;
  onClose: () => void;
}
const AddConvenio: React.FC<Props> = ({ id, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ConvenioIdModel | null>(null)
  const [registros, setRegistros] = useState<ConvenioRegistrosModel[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [cursos, setCursos] = useState<ListCurso[]>([])

  useEffect(() => {
    handleCursos();
    if (id === 0) return;
    handleData(id);
  }, [id]);

  const handleCursos = async () => {
    const dataFetch: ListCurso[] = await fetchListaCursos();
    setCursos(dataFetch);
  };

  const handleData = async (id: number) => {
    try {
      const dataFetch = await fetchIdConvenio(id);
      setData(dataFetch);
      setRegistros(dataFetch?.registros || []);
    } catch (error) {
      console.error("Error al obtener el convenio:", error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    importarExcel(event, mapConvenioRegistros, setRegistros);
  };

  const handleRegistrar = async (values: FormikValues) => {
    setIsLoading(true);
    if (registros.length == 0) {
      setMensaje("Debe agregar al menos una persona al convenio");
      setIsLoading(false);
      return;
    }

    const informacion: ConvenioIdModel = {
      id: id,
      nombre: values.nombre,
      nit: values.nit,
      celular: values.celular,
      correo: values.correo,
      fechaInicio: values.fechaInicio ? new Date(values.fechaInicio) : null,
      fechaFin: values.fechaFin ? new Date(values.fechaFin) : null,
      observacion: values.observacion,
      idCurso: values.idCurso,
      registros: registros
    }

    try {
      if (id > 0) {
        console.log("Actualizar : ", informacion);
      } else {
         
        await api.post('Convenios/Post_Create_Convenio', informacion);
      }
    } catch (error) {
      console.error('Error al registrar:', error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className={style.AddConvenio}>
      <div className={style.AddConvenio_Header}>
        <button onClick={onClose}><IoArrowBack /> Volver a la  lista</button>
        <p>Este es el convenio. Aquí encontrarás gestionar su información.</p>
      </div>
      <div className={style.AddConvenio_Body}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            nombre: data?.nombre || '',
            nit: data?.nit || '',
            celular: data?.celular || '',
            correo: data?.correo || '',
            observacion: data?.observacion || '',
            fechaInicio: data?.fechaInicio ? dayjs(data.fechaInicio) : null,
            fechaFin: data?.fechaFin ? dayjs(data.fechaFin) : null,
            idCurso: data?.idCurso || '',


          }}
          validate={(values) => {
            let errors: any = {};
            const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;
            const phoneRegex = /^[0-9]{10}$/;
            const nitRegex = /^[0-9]+$/;

            if (!values.nombre) {
              errors.nombre = 'El campo nombres es obligatorio.';
            } else if (values.nombre.length < 2) {
              errors.nombre = 'Debe contener al menos 2 caracteres.';
            } else if (!nameRegex.test(values.nombre)) {
              errors.nombre = 'Solo se permiten letras.';
            }

            if (!values.nit) {
              errors.nit = 'El campo NIT es obligatorio.';
            } else if (!nitRegex.test(values.nit)) {
              errors.nit = 'Solo se permiten números.';
            }

            if (!values.celular) {
              errors.celular = 'El campo celular es obligatorio.';
            } else if (!phoneRegex.test(values.celular.toString())) {
              errors.celular = 'Debe contener 10 dígitos numéricos.';
            }

            if (!values.correo) {
              errors.correo = 'El campo correo es obligatorio.';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.correo)) {
              errors.correo = 'Correo inválido.';
            }

            if (!values.fechaInicio) {
              errors.fechaInicio = 'La fecha de inicio es obligatoria.';
            }

            if (!values.fechaFin) {
              errors.fechaFin = 'La fecha de finalización es obligatoria.';
            } else if (values.fechaInicio && values.fechaFin.isBefore(values.fechaInicio)) {
              errors.fechaFin = 'La fecha de finalización debe ser posterior a la fecha de inicio.';
            }

            if (!values.idCurso) {
              errors.idCurso = 'Debe seleccionar un curso.';
            }

            return errors;
          }}
          onSubmit={handleRegistrar}
        >
          {({ errors, values, setFieldValue, isSubmitting }) => (
            <Form>
              <div className={style.AddConvenio_Body_Informacion}>
                <div className={style.Formulario_Titulo}>
                  <h3>Información</h3>
                </div>
                <div className={style.Formulario_Dos}>
                  <div>
                    <StyledTextField
                      name='nombre'
                      label="Nombre"
                      variant="outlined"
                      size="small"
                      placeholder='Introduce nombre'
                      value={values.nombre}
                      onChange={(e) => setFieldValue('nombre', e.target.value)}
                    />
                    <ErrorMessage name='nombre' component={() => <p className={style.Error}>{errors.nombre}</p>} />
                  </div>
                  <div>
                    <StyledTextField
                      name='documento'
                      label="NIT o documento"
                      variant="outlined"
                      size="small"
                      placeholder='Introduce nit o numero de documento'
                      value={values.nit}
                      onChange={(e) => setFieldValue('nit', e.target.value)}
                    />
                    <ErrorMessage name='nit' component={() => <p className={style.Error}>{errors.nit}</p>} />
                  </div>
                </div>
                <div className={style.Formulario_Dos}>
                  <div>
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
                  <div>
                    <StyledTextField
                      name='celular'
                      variant="outlined"
                      size="small"
                      label="Celular o teléfono"
                      placeholder='Introduce el número de teléfono o celular'
                      value={values.celular}
                      onChange={(e) => setFieldValue('celular', e.target.value)}
                    />
                    <ErrorMessage name='celular' component={() => <p className={style.Error}>{errors.celular}</p>} />
                  </div>
                </div>
                <div className={style.Formulario_Input_Div}>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <StyledDatePicker
                          label="FECHA DE INICIO"
                          value={values.fechaInicio}
                          onChange={(date) => setFieldValue('fechaInicio', date)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <ErrorMessage name='fechaInicio' component={() => <p className={style.Error_Fecha}>{errors.fechaInicio}</p>} />
                  </div>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <StyledDatePicker
                          label="FECHA FIN"
                          value={values.fechaFin}
                          onChange={(date) => setFieldValue('fechaFin', date)}
                        />

                      </DemoContainer>
                    </LocalizationProvider>
                    <ErrorMessage name='fechaFin' component={() => <p className={style.Error_Fecha}>{errors.fechaFin}</p>} />
                  </div>
                </div>
                <div className={style.Formulario}>
                  <StyledTextArea
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Realiza una observación sobre este convenio..."
                    value={values.observacion}
                    onChange={(e) => setFieldValue('observacion', e.target.value)}
                  />
                  <ErrorMessage name="observacion" component={() => <p className={style.Error}>{errors.observacion}</p>} />
                </div>
                <div className={style.Formulario}>
                  <StyledSelect
                    id="curso"
                    select
                    label="Curso"
                    size="small"
                    variant="outlined"
                    value={values.idCurso}
                    onChange={(e) => setFieldValue('idCurso', e.target.value)}
                  >
                    <MenuItem value="0">Seleccione</MenuItem>
                    {cursos && cursos.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.titulo}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                  <ErrorMessage name="idCurso" component={() => <p className={style.Error}>{errors.idCurso}</p>} />
                </div>
              </div>
              <div className={style.AddConvenio_Registros}>
                <div className={style.AddConvenio_Registros_Botones}>
                  <p className={style.Error}>{mensaje}</p>
                  <div
                    className={style.Registros_Botones_Label}
                    onClick={() => document.getElementById("xmlInput")?.click()}
                  >
                    <IoCloudUpload /> Importar personas del convenio
                  </div>
                  <input
                    type="file"
                    id="xmlInput"
                    accept=".xlsx, .xls"
                    hidden
                    onChange={handleFileUpload}
                  />
                </div>
                {registros.length > 0 && (
                  <>
                    <p>Aquí podrás ver las personas que recibirán el beneficio del convenio y gestionar su información.</p>
                    <Tabla
                      data={registros}
                      verBuscador={false}
                      verAcciones={false}
                    />
                  </>
                )}
              </div>
              <ButtonSubmit
                id={id}
                isLoading={isLoading}
                isSubmitting={isSubmitting}
                onClose={onClose}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div >
  )
}

export default AddConvenio
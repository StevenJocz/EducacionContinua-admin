"use client"
import Link from 'next/link'
import { RoutesAdmin } from '../nav/AdminNav.model'
import style from './Estudiantes.module.css'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { EstudiantesModel } from './Estudiantes.model'
import { fetchData } from './Estudiantes.service'
import { Tabla } from '@/components/tabla'
import Perfil from './perfil/Perfil'

const Estudiantes = () => {
  const [data, setData] = useState<EstudiantesModel[]>([]);
  const [verPerfil, setVerPerfil] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    handleData();
  }, []);

  const handleData = () => {
    const dataFetch = fetchData();
    setData(dataFetch);
  }

  const handleVerPerfil = (id: number) => {
    setId(id);
    setVerPerfil(!verPerfil);
  }

  return (
    <div className={style.Estudiante}>
      <div className={style.Estudiante_Header}>
        <h1><span>Estudiantes</span></h1>
        <div className={style.Estudiante_Header_Navegacion}>
          <Link href={`${RoutesAdmin.INICIO.path}`}>
            Admin
          </Link>
          <IoChevronForwardOutline className={style.Icono} />
          <Link href={`${RoutesAdmin.ESTUDIANTE.path}`} className={style.Seleccionado}>
            {RoutesAdmin.ESTUDIANTE.name}
          </Link>
        </div>
      </div>
      {verPerfil ? (
        <Perfil
          id={id}
          onClose={() => setVerPerfil(false)}
        />
      ) : (
        <>
          <p className={style.Estudiante_Texto}>En este módulo encontrarás todas las opciones relacionadas con la gestión de estudiantes.</p>
          <div className={style.Estudiante_Body}>
            <Tabla
              data={data}
              verBotonEditar={true}
              mostrarRegistro={handleVerPerfil}
            />
          </div>
        </>
      )}



    </div>
  )
}

export default Estudiantes
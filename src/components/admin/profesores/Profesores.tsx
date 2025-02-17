"use client"
import Link from 'next/link'
import { RoutesAdmin } from '../nav/AdminNav.model'
import style from './Profesores.module.css'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { ProfesoresModel } from './Profesores.model'
import { useEffect, useState } from 'react'
import { fetchData } from './Profesores.service'
import { Tabla } from '@/components/tabla'

const Profesores = () => {
     const [data, setData] = useState<ProfesoresModel[]>([]);
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
        <div className={style.Profesores}>
            <div className={style.Profesores_Header}>
                <h1><span>Profesores</span></h1>
                <div className={style.Profesores_Header_Navegacion}>
                    <Link href={`${RoutesAdmin.INICIO.path}`}>
                        Admin
                    </Link>
                    <IoChevronForwardOutline className={style.Icono} />
                    <Link href={`${RoutesAdmin.PROFESORES.path}`} className={style.Seleccionado}>
                        {RoutesAdmin.PROFESORES.name}
                    </Link>
                </div>
            </div>
            <p className={style.Profesores_Texto}>En este módulo encontrarás todas las opciones relacionadas con la gestión de profesores.</p>
            <div className={style.Profesores_Body}>
                <Tabla
                    data={data}
                    verBotonEditar={true}
                    mostrarRegistro={handleVerPerfil}
                />
            </div>

        </div>
    )
}

export default Profesores
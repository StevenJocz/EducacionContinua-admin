"use client"
import { Tabla } from '@/components/tabla'
import style from './Vendedores.module.css'
import Link from 'next/link'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { RoutesAdmin } from '../nav/AdminNav.model'
import { useEffect, useState } from 'react'
import { VendedorModel } from './Vendedores.model'
import { fetchData } from './Vendedores.service'

const Vendedores = () => {
    const [data, setData] = useState<VendedorModel[]>([]);
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
        <div className={style.Vendedores}>
            <div className={style.Vendedores_Header}>
                <h1><span>Vendedores</span></h1>
                <div className={style.Vendedores_Header_Navegacion}>
                    <Link href={`${RoutesAdmin.INICIO.path}`}>
                        Admin
                    </Link>
                    <IoChevronForwardOutline className={style.Icono} />
                    <Link href={`${RoutesAdmin.VENDEDORES.path}`} className={style.Seleccionado}>
                        {RoutesAdmin.VENDEDORES.name}
                    </Link>
                </div>
            </div>
            <p className={style.Vendedores_Texto}>En este módulo encontrarás todas las opciones relacionadas con la gestión de vendedores.</p>

            <div className={style.Vendedores_Body}>
                <Tabla
                    data={data}
                    verBotonEditar={true}
                    mostrarRegistro={handleVerPerfil}
                />

            </div>

        </div>
    )
}

export default Vendedores

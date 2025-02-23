"use client"
import { useEffect, useState } from 'react';
import style from './Convenios.module.css'
import { ConveniosModel } from './Convenios.model';
import { fetchData } from './Convenios.service';
import Link from 'next/link';
import { IoAdd, IoChevronForwardOutline } from 'react-icons/io5';
import { RoutesAdmin } from '../nav/AdminNav.model';
import { Tabla } from '@/components/tabla';
import AddConvenio from './addConvenio/AddConvenio';

const Convenios = () => {
    const [data, setData] = useState<ConveniosModel[]>([]);
    const [verAdd, setVerAdd] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        handleData();
    }, []);

    const handleData = () => {
        const dataFetch = fetchData();
        setData(dataFetch);
    }

    const handleVerAdd = (id: number) => {
        setId(id);
        setVerAdd(!verAdd);
    }
    return (
        <div className={style.Convenios}>
            <div className={style.Convenios_Header}>
                <h1><span>Convenios</span></h1>
                <div className={style.Convenios_Header_Navegacion}>
                    <Link href={`${RoutesAdmin.INICIO.path}`}>
                        Admin
                    </Link>
                    <IoChevronForwardOutline className={style.Icono} />
                    <Link href={`${RoutesAdmin.CONVENIOS.path}`} className={style.Seleccionado}>
                        {RoutesAdmin.CONVENIOS.name}
                    </Link>
                </div>
            </div>
            {verAdd ? (
                <AddConvenio
                    id={id}
                    onClose={() => setVerAdd(false)}
                />
            ) : (
                <>
                    <p className={style.Convenios_Texto}>En este módulo encontrarás todas las opciones relacionadas con la gestión de convenios.</p>
                    <button
                        className={style.Convenios_Button}
                        onClick={() => handleVerAdd(0)}
                    >
                        <IoAdd />
                        Agregar convenio
                    </button>
                    <div className={style.Convenios_Body}>
                        <Tabla
                            data={data}
                            verBotonEditar={true}
                            mostrarRegistro={handleVerAdd}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default Convenios
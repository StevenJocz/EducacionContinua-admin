"use client";
import Link from 'next/link';
import style from './Configuracion.module.css'
import { IoBusinessOutline, IoChevronForwardOutline, IoDocumentTextOutline, IoFolderOpenOutline, IoHelpCircleOutline, IoMapOutline } from 'react-icons/io5';
import { RoutesAdmin } from '../nav/AdminNav.model';
import { useState } from 'react';
import img from '../../../../public/svg/configuration.svg'
import Dependencias from './dependencias/Dependencias';
import Image from 'next/image';
import Categoria from './categorias/Categoria';
import Documentos from './documentos/Documentos';
import Vias from './vias/Vias';
import FAQS from './faqs/FAQS';

const configuracion = () => {
    const [menu, setMenu] = useState(1);

    const handdleParametro = (opcion: number) => {
        setMenu(opcion);
    }

    return (
        <div className={style.Configuracion}>
            <div className={style.Configuracion_Header}>
                <h1><span>Configuración</span></h1>
                <div className={style.Configuracion_Header_Navegacion}>
                    <Link href={`${RoutesAdmin.INICIO.path}`}>
                        Admin
                    </Link>
                    <IoChevronForwardOutline className={style.Icono} />
                    <Link href={`${RoutesAdmin.CONFIGURACION.path}`} className={menu == 0 ? style.Seleccionado : ""}>
                        {RoutesAdmin.CONFIGURACION.name}
                    </Link>
                    {menu != 0 &&
                        <>
                            <IoChevronForwardOutline className={style.Icono} />
                            <p className={style.Seleccionado}>
                                {menu == 1 ? (
                                    <span>Dependencias</span>
                                ) : menu == 2 ? (
                                    <span>Categorías</span>
                                ) : menu == 3 ? (
                                    <span>Documentos</span>
                                ) : menu == 4 ? (
                                    <span>Tipos de tipos de direcciones</span>
                                ) : menu == 5 ? (
                                    <span>FAQ'S</span>
                                ) : (
                                    <p>otro</p>
                                )}
                            </p>
                        </>
                    }
                </div>
            </div>
            <p className={style.Configuracion_Texto}>En este módulo encontrarás todas las opciones de configuración del sistema.</p>
            <div className={style.Configuracion_Menu}>
                <ul>
                    <li
                        className={menu === 1 ? style.Seleccionado : ""}
                        onClick={() => handdleParametro(1)}
                    >
                        <IoBusinessOutline /> Dependencias
                    </li>
                    <li
                        className={menu === 2 ? style.Seleccionado : ""}
                        onClick={() => handdleParametro(2)}
                    >
                        <IoFolderOpenOutline /> Categorías
                    </li>
                    <li
                        className={menu === 3 ? style.Seleccionado : ""}
                        onClick={() => handdleParametro(3)}
                    >
                        <IoDocumentTextOutline /> Documentos
                    </li>
                    <li
                        className={menu === 4 ? style.Seleccionado : ""}
                        onClick={() => handdleParametro(4)}
                    >
                        <IoMapOutline /> Tipos de tipos de direcciones
                    </li>
                    <li
                        className={menu === 5 ? style.Seleccionado : ""}
                        onClick={() => handdleParametro(5)}
                    >
                        <IoHelpCircleOutline /> FAQ'S
                    </li>
                </ul>
            </div>
            <div className={style.Configuracion_Content}>
                {menu == 1 ? (
                    <Dependencias />
                ) : menu == 2 ? (
                    <Categoria/>
                ) : menu == 3 ? (
                    <Documentos/>
                ) : menu == 4 ? (
                    <Vias/>
                ) : menu == 5 ? (
                    <FAQS />
                ) : (
                    <Dependencias />
                )}
            </div>
        </div>
    )
}

export default configuracion
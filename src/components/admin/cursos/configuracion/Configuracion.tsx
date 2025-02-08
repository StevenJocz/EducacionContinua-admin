"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link'
import style from './Configuracion.module.css'
import { IoAdd, IoBookOutline, IoCashOutline, IoChevronForwardOutline, IoCloudDoneOutline, IoFolderOpenOutline, IoPeopleOutline } from 'react-icons/io5';
import { RoutesAdmin } from '@/components/admin/nav/AdminNav.model';
import Informacion from './formularios/Informacion';
import { Temario } from './temario';
import { Recursos } from './recursos';
import { Grupos } from './grupos';
import { Cupones } from './cupones';


const Configuracion = () => {
    const { crearcurso } = useParams();
    const decoded = Buffer.from(crearcurso as string, 'base64').toString();
    const [id, opcion] = decoded.split('|');

    const handdleParametro = (id: number, opcion: number) => {
        const parametros = `${id}|${opcion}`;
        // Codificamos en Base64
        const codificado = Buffer.from(parametros).toString('base64');
        return codificado;
    }
    return (
        <div className={style.CrearCurso}>
            <div className={style.CrearCurso_Header}>
                <div>
                    <h1>Configuración del <span>curso</span></h1>
                </div>
                <div className={style.CrearCurso_Header_Navegacion}>
                    <Link href={`${RoutesAdmin.INICIO.path}`}>
                        Admin
                    </Link>
                    <IoChevronForwardOutline className={style.Icono} />
                    <Link href={`${RoutesAdmin.CURSOS.path}`} >
                        {RoutesAdmin.CURSOS.name}
                    </Link>
                    <IoChevronForwardOutline className={style.Icono} />
                    <p className={style.Seleccionado}>
                        {opcion[0] == "1" ? (
                            <span>información</span>
                        ) : opcion[0] == "2" ? (
                            <span>Temario</span>
                        ) : opcion[0] == "3" ? (
                            <span>PDF's y Recursos</span>
                        ) : opcion[0] == "4" ? (
                            <span>Grupos</span>
                        ) : opcion[0] == "5" ? (
                            <span>Cupones</span>
                        ) : (
                            <p>otro</p>
                        )}
                    </p>
                </div>
            </div>
            <p>Los siguientes datos son fundamentales para el curso. Completa los campos cuidadosamente.</p>
            {id != "0" &&
                <ul className={style.Ul_Navegacion}>
                    <li>
                        <Link href={`${handdleParametro(parseInt(id), 1)}`}
                            className={opcion[0] === "1" ? style.Seleccionado : ""}
                        >
                            <IoBookOutline />
                            Información
                        </Link>
                    </li>
                    <li>
                        <Link href={`${handdleParametro(parseInt(id), 2)}`}
                            className={opcion[0] === "2" ? style.Seleccionado : ""}
                        >
                            <IoFolderOpenOutline />
                            Temario
                        </Link>
                    </li>
                    <li>
                        <Link href={`${handdleParametro(parseInt(id), 3)}`}
                            className={opcion[0] === "3" ? style.Seleccionado : ""}
                        >
                            <IoCloudDoneOutline />
                            PDF's y Recursos
                        </Link>
                    </li>
                    <li>
                        <Link href={`${handdleParametro(parseInt(id), 4)}`}
                            className={opcion[0] === "4" ? style.Seleccionado : ""}
                        >
                            <IoPeopleOutline />
                            Grupos
                        </Link>
                    </li>
                    <li>
                        <Link href={`${handdleParametro(parseInt(id), 5)}`}
                            className={opcion[0] === "5" ? style.Seleccionado : ""}
                        >
                            <IoCashOutline />
                            Cupones
                        </Link>
                    </li>
                </ul>
            }


            {opcion[0] == "1" ? (
                <Informacion idCurso={parseInt(id[0])} />
            ) : opcion[0] == "2" ? (
                <Temario idCurso={parseInt(id[0])} />
            ) : opcion[0] == "3" ? (
                <Recursos idCurso={parseInt(id[0])} />
            ) : opcion[0] == "4" ? (
                <Grupos idCurso={parseInt(id[0])} />
            ) : opcion[0] == "5" ? (
                <Cupones idCurso={parseInt(id[0])}/>
            ) : (
                <p>otro</p>
            )}

        </div>
    )
}

export default Configuracion
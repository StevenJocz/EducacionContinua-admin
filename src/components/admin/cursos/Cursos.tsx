'use client';

import { IoAdd, IoCashOutline, IoCheckmarkCircle, IoChevronForwardOutline, IoCloseCircle, IoCloudDoneOutline, IoFilter, IoFolderOpenOutline, IoPencil, IoPeopleOutline, IoSettingsOutline } from 'react-icons/io5';
import style from './Cursos.module.css';
import Link from 'next/link';
import { RoutesAdmin } from '../nav/AdminNav.model';
import { useState } from 'react';
import { Alert, Button, MenuItem, Snackbar, Switch, TextField, styled } from '@mui/material';
import Image from 'next/image';
import { blurImagen } from '@/models';
import { fetchListaCursos } from './Cursos.service';
import { StyledSelect } from '@/utils/MaterialUI';

const Cursos = () => {
    const [filtros, setFiltros] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [estadoFiltro, setEstadoFiltro] = useState('');
    const [dependenciaFiltro, setDependenciaFiltro] = useState('');
    const [categoriaFiltro, setCategoriaFiltro] = useState('');

    const cursos = fetchListaCursos();

    const handleFiltros = () => {
        setFiltros(!filtros);
    };

    // Función para filtrar los cursos
    const filteredCursos = cursos.filter((curso) => {
        const matchesSearchQuery = curso.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesEstado = estadoFiltro ? curso.estado === estadoFiltro : true;
        const matchesDependencia = dependenciaFiltro ? curso.dependencia === dependenciaFiltro : true;
        const matchesCategoria = categoriaFiltro ? curso.categoria === categoriaFiltro : true;

        return matchesSearchQuery && matchesEstado && matchesDependencia && matchesCategoria;
    });


    const handdleParametro = (id: number, opcion: number) => {
        const parametros = `${id}|${opcion}`;
        // Codificamos en Base64
        const codificado = Buffer.from(parametros).toString('base64');
        return codificado;
    }

    return (
        <div className={style.Cursos}>
            <div className={style.Cursos_Header}>
                <h1>Lista de <span>cursos</span></h1>
                <div className={style.Cursos_Header_Navegacion}>
                    <Link href={`${RoutesAdmin.INICIO.path}`}>
                        Admin
                    </Link>
                    <IoChevronForwardOutline className={style.Icono} />
                    <Link href={`${RoutesAdmin.CURSOS.path}`} className={style.Seleccionado}>
                        {RoutesAdmin.CURSOS.name}
                    </Link>
                </div>
            </div>
            <div className={style.Cursos_Acciones}>
                <Link href={`cursos/${handdleParametro(0, 1)}`}>
                    <IoAdd /> Crear Curso
                </Link>
                <div className={style.Cursos_Acciones_Buscador}>
                    <input
                        type="text"
                        placeholder="¿Qué curso estás buscando?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleFiltros}><IoFilter /> {filtros ? 'Cerrar' : 'Más'} filtros</button>
                </div>
            </div>

            {filtros &&
                <div className={style.Cursos_Filtros}>
                    <div className={style.Cursos_Filtros_Item}>
                        <StyledSelect
                            id="estado"
                            select
                            label="Estado"
                            size="small"
                            variant="outlined"
                            value={estadoFiltro}
                            onChange={(e) => setEstadoFiltro(e.target.value)}
                        >
                            <MenuItem value="">
                                Todos
                            </MenuItem>
                            <MenuItem value="Activo">Activo</MenuItem>
                            <MenuItem value="No activo">No Activo</MenuItem>
                        </StyledSelect>
                    </div>

                    <div className={style.Cursos_Filtros_Item}>
                        <StyledSelect
                            id="dependencia"
                            select
                            label="Dependencia"
                            size="small"
                            variant="outlined"
                            value={dependenciaFiltro}
                            onChange={(e) => setDependenciaFiltro(e.target.value)}
                        >
                            <MenuItem value="">
                                Todos
                            </MenuItem>
                            {/* Agregar las dependencias disponibles */}
                            <MenuItem value="Facultad de Humanidades">Facultad de Humanidades</MenuItem>
                            <MenuItem value="Facultad de Ingeniería">Facultad de Ingeniería</MenuItem>
                            {/* Otros valores */}
                        </StyledSelect>
                    </div>

                    <div className={style.Cursos_Filtros_Item}>
                        <StyledSelect
                            id="categoria"
                            select
                            label="Categoría"
                            size="small"
                            variant="outlined"
                            value={categoriaFiltro}
                            onChange={(e) => setCategoriaFiltro(e.target.value)}
                        >
                            <MenuItem value="">
                                Todos
                            </MenuItem>
                            <MenuItem value="Idiomas">Idiomas</MenuItem>
                            <MenuItem value="Enfermería">Enfermería</MenuItem>
                            <MenuItem value="Ingeniería">Ingeniería</MenuItem>
                            {/* Otras categorías */}
                        </StyledSelect>
                    </div>
                </div>
            }

            <div className={style.Cursos_Content}>
                {filteredCursos.sort((a, b) => b.id - a.id).map((curso) => (
                    <div className={style.Cursos_Content_Card} key={curso.id}>
                        <Link href={`cursos/${handdleParametro(curso.id, 1)}`}>
                            <>
                                <Image
                                    src={curso.image}
                                    className={style.Imagen}
                                    alt={curso.title}
                                    width={385}
                                    height={200}
                                    placeholder={blurImagen}
                                    blurDataURL="data:image/svg+xml;base64,..."
                                />
                                <div>
                                    <h3>ID: {curso.codigo}</h3>
                                    <span className={`${style[curso.estado]}`}>{curso.estado}</span>
                                </div>
                                <h2 className={style.title}>{curso.title}</h2>
                            </>
                        </Link>

                        <div className={style.Cursos_Content_Card_Configuracion}>
                            <ul>
                                <li>
                                    <p>
                                        {curso.temario ? (
                                            <IoCheckmarkCircle className={style.Icono_Si} />
                                        ) : (
                                            <IoCloseCircle className={style.Icono_No} />
                                        )}
                                        <IoFolderOpenOutline />
                                        Temario
                                    </p>
                                    <Link href={`cursos/${handdleParametro(curso.id, 2)}`}>
                                        <IoSettingsOutline />
                                        Configurar
                                    </Link>
                                </li>
                                <li>
                                    <p>
                                        {curso.recursos ? (
                                            <IoCheckmarkCircle className={style.Icono_Si} />
                                        ) : (
                                            <IoCloseCircle className={style.Icono_No} />
                                        )}
                                        <IoCloudDoneOutline />
                                        PDF's y Recursos
                                    </p>
                                    <Link href={`cursos/${handdleParametro(curso.id, 3)}`} >
                                        <IoSettingsOutline />
                                        Configurar
                                    </Link>
                                </li>
                                <li>
                                    <p>
                                        {curso.grupos ? (
                                            <IoCheckmarkCircle className={style.Icono_Si} />
                                        ) : (
                                            <IoCloseCircle className={style.Icono_No} />
                                        )}
                                        <IoPeopleOutline />
                                        Grupos
                                    </p>
                                    <Link href={`cursos/${handdleParametro(curso.id, 4)}`} >
                                        <IoSettingsOutline />
                                        Configurar
                                    </Link>
                                </li>
                                <li>
                                    <p>
                                        {curso.cupones ? (
                                            <IoCheckmarkCircle className={style.Icono_Si} />
                                        ) : (
                                            <IoCloseCircle className={style.Icono_No} />
                                        )}
                                        <IoCashOutline />
                                        Cupones
                                    </p>

                                    <Link href={`cursos/${handdleParametro(curso.id, 5)}`} >
                                        <IoSettingsOutline />
                                        Configurar
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cursos;

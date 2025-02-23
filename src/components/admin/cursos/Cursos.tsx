'use client';
import { IoAdd, IoCashOutline, IoCheckmarkCircle, IoChevronForwardOutline, IoCloseCircle, IoCloudDoneOutline, IoFilter, IoFolderOpenOutline, IoPeopleOutline, IoSettingsOutline } from 'react-icons/io5';
import style from './Cursos.module.css';
import Link from 'next/link';
import { RoutesAdmin } from '../nav/AdminNav.model';
import { useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import Image from 'next/image';
import { blurImagen } from '@/models';
import { fetchListaCursos } from './Cursos.service';
import { StyledSelect } from '@/utils/MaterialUI';
import { Dependencia } from '../configuracion/dependencias/Dependencias.model';
import { CategoriaModel } from '../configuracion/categorias/Categoria.model';
import { fetchCategorias } from '../configuracion/categorias/Categoria.service';
import { fetchDependecias } from '../configuracion/dependencias/Dependencias.service';
import { Imagen, ListCurso } from './Cursos.model';

const normalizeText = (text?: string) => {
    return text ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';
};

const Cursos = () => {
    const [cursos, setCursos] = useState<ListCurso[]>([])
    const [dependencia, setDependencia] = useState<Dependencia[] | null>(null);
    const [categoria, setCategoria] = useState<CategoriaModel[] | null>(null);
    const [filtros, setFiltros] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [estadoFiltro, setEstadoFiltro] = useState('');
    const [dependenciaFiltro, setDependenciaFiltro] = useState('');
    const [categoriaFiltro, setCategoriaFiltro] = useState('');

    useEffect(() => {
        handleData();
        handleCategoria();
        handleDependencia();

    }, []);

    const handleData = async () => {
        const dataFetch: ListCurso[] = await fetchListaCursos();
        setCursos(dataFetch);
    };

    const handleFiltros = () => {
        setFiltros(!filtros);
    };

    const handleCategoria = async () => {
        const dataFetch: CategoriaModel[] = await fetchCategorias();
        setCategoria(dataFetch);
    };

    const handleDependencia = async () => {
        const dataFetch: Dependencia[] = await fetchDependecias();
        setDependencia(dataFetch);
    };

    // Filtrado de cursos ignorando tildes
    const filteredCursos = cursos.filter((curso) => {
        const cursoTitleNormalized = normalizeText(curso.titulo);
        const cursoCodigoNormalized = normalizeText(curso.codigo?.toString());
        const searchQueryNormalized = normalizeText(searchQuery);

        const matchesSearchQuery = cursoTitleNormalized.includes(searchQueryNormalized) || cursoCodigoNormalized.includes(searchQueryNormalized);
        const matchesEstado = estadoFiltro ? curso.estado === estadoFiltro : true;
        const matchesDependencia = dependenciaFiltro ? curso.dependencia.toString() === dependenciaFiltro : true;
        const matchesCategoria = categoriaFiltro
            ? curso.cursoCategorias && Array.isArray(curso.cursoCategorias) && curso.cursoCategorias.some(cat => cat.nombre === categoriaFiltro)
            : true;

        return matchesSearchQuery && matchesEstado && matchesDependencia && matchesCategoria;
    });

    const handdleParametro = (id: number, opcion: number) => {
        const parametros = `${id}|${opcion}`;
        const codificado = Buffer.from(parametros).toString('base64');
        return codificado;
    };

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
                            <MenuItem value="">Todos</MenuItem>
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
                            <MenuItem value="">Todos</MenuItem>
                            {dependencia && dependencia.map((option) => (
                                <MenuItem key={option.id} value={option.nombre}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
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
                            <MenuItem value="">Todos</MenuItem>
                            {categoria && categoria.map((option) => (
                                <MenuItem key={option.id} value={option.nombre}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
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
                                    src={`${Imagen.URL}${curso.imagen}`}
                                    className={style.Imagen}
                                    alt={curso.titulo || "Imagen del curso"}
                                    width={385}
                                    height={200}
                                    placeholder="blur"
                                    blurDataURL="data:image/svg+xml;base64,..."
                                />
                                <div>
                                    <h3>ID: {curso.codigo}</h3>
                                    <span className={`${style[curso.estado]}`}>{curso.estado}</span>
                                </div>
                                <h2 className={style.title}>{curso.titulo}</h2>
                            </>
                        </Link>

                        <div className={style.Cursos_Content_Card_Configuracion}>
                            <ul>
                                <li>
                                    <p>
                                        {curso.temario ? <IoCheckmarkCircle className={style.Icono_Si} /> : <IoCloseCircle className={style.Icono_No} />}
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
                                        {curso.recursos ? <IoCheckmarkCircle className={style.Icono_Si} /> : <IoCloseCircle className={style.Icono_No} />}
                                        <IoCloudDoneOutline />
                                        PDF's y Recursos
                                    </p>
                                    <Link href={`cursos/${handdleParametro(curso.id, 3)}`}>
                                        <IoSettingsOutline />
                                        Configurar
                                    </Link>
                                </li>
                                <li>
                                    <p>
                                        {curso.grupos ? <IoCheckmarkCircle className={style.Icono_Si} /> : <IoCloseCircle className={style.Icono_No} />}
                                        <IoPeopleOutline />
                                        Grupos
                                    </p>
                                    <Link href={`cursos/${handdleParametro(curso.id, 4)}`}>
                                        <IoSettingsOutline />
                                        Configurar
                                    </Link>
                                </li>
                                <li>
                                    <p>
                                        {curso.cupones ? <IoCheckmarkCircle className={style.Icono_Si} /> : <IoCloseCircle className={style.Icono_No} />}
                                        <IoCashOutline />
                                        Cupones
                                    </p>
                                    <Link href={`cursos/${handdleParametro(curso.id, 5)}`}>
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

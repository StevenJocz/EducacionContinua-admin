"use client";
import { useParams } from 'next/navigation';
import {
    IoBookmarkOutline,
    IoCloudDoneOutline,
    IoFolderOpenOutline,
    IoChatboxEllipsesOutline,
    IoPersonOutline
} from "react-icons/io5";
import style from './Curso.module.css'
import { Anuncios } from './anuncios';
import { Items } from './items';
import { Mao } from '@/components/mao';
import { CusosNav } from './cursosNav';
import { CursosContenido } from './cursosContenido';
import { useEffect, useRef, useState } from 'react';
import { Quiz, Tema } from './Curso.model';
import { fetchCursoID } from './CursoView.service';
import { CursoProgreso } from './cursoProgreso';
import { CursoInformacion } from './cursoInformacion';
import { CursoInstructor } from './cursoInstructor';
import { CursoRecursos } from './cursoRecursos';
import { useCursos } from '@/context/Curso.context';
import { CursoDiploma } from './cursoDiploma';
import { CursoQuiz } from './cursoQuiz';

const Curso = () => {
    const { student } = useParams();
    const decoded = Buffer.from(student as string, 'base64').toString();
    const [id] = decoded.split('|');
    const { cursos, setCursos } = useCursos();
    const [tema, setTema] = useState<Tema | undefined>(undefined);
    const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);
    const [moduloSeleccionado, setModuloSeleccionado] = useState<number>(0);
    const [liSeleccionado, setLiSeleccionado] = useState<{ id: number, esQuiz: boolean }>({ id: 0, esQuiz: false });
    const [scrollPercentage, setScrollPercentage] = useState(0); // Estado para almacenar el porcentaje de desplazamiento
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        handleCurso(parseInt(id[0]));
    }, [id]);

    const handleCurso = async (id: number) => {
        const cursoData = await fetchCursoID(id);
        setCursos(cursoData);
    };

    const handleTemaSeleccionado = (temaId: number, moduloId: number) => seleccionarItem(temaId, moduloId, false);
    const handleQuizSeleccionado = (quizId: number, moduloId: number) => seleccionarItem(quizId, moduloId, true);

    const seleccionarItem = (
        itemId: number,
        moduloId: number,
        esQuiz: boolean
    ): void => {
        setModuloSeleccionado(moduloId);
        setLiSeleccionado({ id: itemId, esQuiz: esQuiz });
    
        if (itemId === 0) {
            setTema(undefined);
            setQuiz(undefined);
            return;
        }
    
        const modulo = cursos[0]?.modulos.find((modulo) => modulo.id === moduloId);
        if (!modulo) return;
    
        if (esQuiz) {
            const quizSeleccionado = modulo.quizz.find(
                (quiz) => quiz.id === itemId
            );
            setQuiz(quizSeleccionado);
            setTema(undefined); // Garantizamos que `setTema` no recibe `Quiz`.
        } else {
            const temaSeleccionado = modulo.temas.find(
                (tema) => tema.id === itemId
            );
            setTema(temaSeleccionado);
            setQuiz(undefined); // Garantizamos que `setQuiz` no recibe `Tema`.
        }
    
        // Reinicia el scroll a la parte superior
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    };
    
    // Función para calcular el porcentaje de desplazamiento
    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight - container.clientHeight;
            const percentage = (scrollTop / scrollHeight) * 100;
            setScrollPercentage(percentage); // Actualiza el porcentaje de desplazamiento
        }
    };

    // UseEffect para manejar el evento de scroll
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className={style.Curso}>
            <div className={style.Curso_Nav}>
                <h4>Principales</h4>
                <ul className={style.Curso_Nav_Ul}>
                    <li
                        className={`${style.Curso_Nav_Ul_Li} ${liSeleccionado.id === 0 && !liSeleccionado.esQuiz ? style.LiActivo : ""}`}
                        onClick={() => handleTemaSeleccionado(0, 0)}
                    >
                        <IoBookmarkOutline className={style.Curso_Nav_Icono} />
                        Información general
                    </li>
                    <li
                        className={`${style.Curso_Nav_Ul_Li} ${liSeleccionado.id === -1 && !liSeleccionado.esQuiz ? style.LiActivo : ""}`}
                        onClick={() => handleTemaSeleccionado(-1, 0)}
                    >
                        <IoPersonOutline className={style.Curso_Nav_Icono} />
                        Instructor
                    </li>
                    <li
                        className={`${style.Curso_Nav_Ul_Li} ${liSeleccionado.id === -2 && !liSeleccionado.esQuiz ? style.LiActivo : ""}`}
                        onClick={() => handleTemaSeleccionado(-2, 0)}
                    >
                        <IoCloudDoneOutline className={style.Curso_Nav_Icono} />
                        PDF's y Recursos
                    </li>
                </ul>
                <h4>Recursos</h4>
                <ul className={style.Curso_Nav_Ul}>
                    <li className={style.Curso_Nav_Ul_Li}>
                        <IoFolderOpenOutline className={style.Curso_Nav_Icono} />
                        Temario
                    </li>
                    <CusosNav
                        modulos={cursos && cursos[0]?.modulos ? cursos[0].modulos : []}
                        onTemaSeleccionado={handleTemaSeleccionado}
                        onQuizSeleccionado={handleQuizSeleccionado}
                        temaSeleccion={liSeleccionado}
                    />
                    <li className={style.Curso_Nav_Ul_Li}>
                        <IoChatboxEllipsesOutline className={style.Curso_Nav_Icono} />
                        Grupo de conversación
                    </li>
                </ul>
            </div>
            <div className={style.Curso_Content} ref={scrollContainerRef}>
                <h1>{cursos[0]?.titulo}</h1>
                <div className={style.Curso_Content_Header} >
                    <CursoProgreso progreso={cursos[0]?.progreso} />
                    {cursos[0]?.finalizado && cursos[0]?.aprobado && <CursoDiploma />}
                </div>
                {liSeleccionado.id === 0 && !liSeleccionado.esQuiz ? (
                    <CursoInformacion
                        descripcion={cursos[0]?.descripcion}
                    />
                ) : liSeleccionado.id === -1 && !liSeleccionado.esQuiz ? (
                    <CursoInstructor
                        instructor={cursos && cursos[0]?.instructor ? cursos[0].instructor : []}
                    />
                ) : tema != undefined && !liSeleccionado.esQuiz ? (
                    <CursosContenido
                        contenido={tema}
                        cursoId={parseInt(id[0])}
                        moduloId={moduloSeleccionado}
                        scrollPercentage={scrollPercentage}
                    />
                )  : quiz != undefined && liSeleccionado.esQuiz ? (
                    <CursoQuiz 
                        quiz={quiz}
                        cursoId={parseInt(id[0])}
                        moduloId={moduloSeleccionado}
                        
                    />
                ): (
                    <CursoRecursos
                        driveEnlace={cursos[0]?.drive}
                    />
                )}
            </div>
            <div className={style.Curso_Recursos}>
                <Anuncios cursoId={parseInt(id[0])} grupoId={cursos[0]?.grupo} />
                <Items cursoId={parseInt(id[0])} grupoId={cursos[0]?.grupo} />
                <Mao />
            </div>
        </div>
    );
};

export default Curso;

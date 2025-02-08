"use client"
import React, { useEffect, useState } from 'react';
import style from './Temario.module.css';
import { IoAdd, IoCaretForward, IoChevronDown, IoChevronForward, IoHelpCircleOutline, IoLogoYoutube, IoPencil } from 'react-icons/io5';
import AddQuiz from './AddQuiz';
import { Modulos } from './modulos';
import Temas from './temas/Temas';
import { fetchModulos } from './Temario.service';
import { Modulo } from './Tamario.model';
import Quiz from './quiz/Quiz';

interface Props {
    idCurso: number;
}


const Temario: React.FC<Props> = ({ idCurso }) => {
    const [modulos, setModulos] = useState<Modulo[]>([]);

    useEffect(() => {
        handleModulos(idCurso);
    }, [idCurso]);

    const handleModulos = async (id: number) => {
        const modulosData = await fetchModulos(idCurso);
        setModulos(modulosData);
    };

    // Agregar Modulos
    const [addModulo, setAddModulo] = useState(false);
    const [idModulo, setIdModulo] = useState(0);

    const handleAddModulo = (idModulo: number) => {
        setIdModulo(idModulo);
        setAddModulo(!addModulo);
    };

    // Agregar Temas
    const [addTema, setAddTema] = useState(false);
    const [idTema, setIdTema] = useState(0);

    const handleAddTema = (idModulo: number, idTema: number) => {
        setIdModulo(idModulo);
        setIdTema(idTema);
        setAddTema(!addTema);
    };

    // Agregar Quiz
    const [addQuiz, setAddQuiz] = useState(false);
    const [idQuiz, setIdQuiz] = useState(0);

    const handleAddQuiz = (idModulo: number,idQuiz: number) => {
        setIdModulo(idModulo);
        setIdQuiz(idQuiz);
        setAddQuiz(!addQuiz);
    };

    const [moduloVisible, setModuloVisible] = useState<number | null>(null);
    const [temaVisible, setTemaVisible] = useState<number | null>(null);

    const toggleModulo = (id: number) => {
        setModuloVisible(moduloVisible === id ? null : id);
    };

    const toggleTema = (id: number) => {
        setTemaVisible(temaVisible === id ? null : id);
    };
    return (
        <div className={style.Temario}>
            <h2>Temario del curso</h2>
            <button
                className={style.AgregarModulo}
                onClick={() => handleAddModulo(0)}
            >
                <IoAdd />
                Agregar Módulo
            </button>

            <ul className={style.Modulos}>
                {modulos.sort((a, b) => b.id - a.id).map((modulo, index) => {
                    const reversedIndex = modulos.length - index;
                    return (
                        <li key={modulo.id}
                            className={`${style.Modulos_Li} ${moduloVisible === modulo.id ? style.ModuloSeleccionado : ""}`}
                        >
                            <div onClick={() => toggleModulo(modulo.id)} className={style.Modulos_Li_Titulo}>
                                <div className={style.Modulos_Li_Titulo_div}>
                                    <span> Módulo - {reversedIndex}. {modulo.titulo}
                                        {moduloVisible === modulo.id ? (
                                            <IoChevronDown className={style.ModuloIcono} />
                                        ) : (
                                            <IoChevronForward className={style.ModuloIcono} />
                                        )}
                                    </span>

                                    <p>{modulo.temas.length} Tema{modulo.temas.length == 1 ? "" : "s"}</p>
                                </div>
                                <div className={style.Botones}>
                                    <button
                                        className={style.Boton_Editar}
                                        onClick={() => handleAddModulo(modulo.id)}
                                    >
                                        <IoPencil />
                                        Editar módulo
                                    </button>
                                    <button
                                        className={style.AgregarTema}
                                        onClick={() => handleAddTema(modulo.id, 0)}
                                    >
                                        <IoAdd />
                                        Agregar Tema
                                    </button>
                                    {/* Mostrar el botón de Agregar Quiz solo si no hay quizzes */}
                                    {modulo.idQuiz == 0 ? (
                                        <button
                                            className={style.AgregarQuiz}
                                            onClick={() => handleAddQuiz(modulo.id, 0)}
                                        >
                                            <IoAdd />
                                            Agregar Quiz
                                        </button>
                                    ) : (
                                        <button
                                            className={style.Boton_Editar}
                                            onClick={() => handleAddQuiz(modulo.id, modulo.idQuiz)}
                                        >
                                            <IoPencil />
                                            Editar Quiz
                                        </button>
                                    )}
                                </div>
                            </div>
                            {moduloVisible === modulo.id && (
                                <div className={style.ModuloContenido}>
                                    {/* Mostrar temas si existen */}
                                    {modulo.temas.length > 0 ? (
                                        <ul className={style.Temas}>
                                            {modulo.temas
                                                .sort((a, b) => b.id - a.id)
                                                .map((tema, temaIndex) => (
                                                    <li key={tema.id} className={style.Temas_Li}>
                                                        <div className={style.Temas_Li_Titulo} onClick={() => toggleTema(tema.id)}>
                                                            <span><IoCaretForward className={style.Icono_Li} /> Tema  - {reversedIndex}.{modulo.temas.length - temaIndex} - {tema.titulo}</span>

                                                            <button
                                                                className={style.Boton_Editar}
                                                                onClick={() => handleAddTema(modulo.id, tema.id)}
                                                            >
                                                                <IoPencil />
                                                                Editar tema
                                                            </button>
                                                        </div>

                                                    </li>
                                                ))}
                                        </ul>
                                    ) : (
                                        <div className={style.SinTemas}>
                                            <p className={style.Vacio}>No hay temas en este módulo.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>



            {addModulo && (
                <Modulos
                    idModulo={idModulo}
                    onClose={() => handleAddModulo(0)}
                />
            )}

            {addTema && (
                <Temas
                    idModulo={idModulo}
                    idTema={idTema}
                    onClose={() => handleAddTema(0, 0)}
                />
            )}

            {addQuiz && (
                <Quiz
                    idModulo={idModulo}
                    idQuiz={idQuiz}
                    onClose={() => handleAddQuiz(0, 0)}
                />
            )}

        </div>
    );
};

export default Temario;

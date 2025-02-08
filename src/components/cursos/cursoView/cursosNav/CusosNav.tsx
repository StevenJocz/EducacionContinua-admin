"use client";
import React, { useState } from "react";
import { IoChevronDown, IoChevronUp, IoCaretForward, IoHelpCircleOutline, IoCheckmark, IoLockClosed } from "react-icons/io5";
import style from './CusosNav.module.css';
import { Modulo } from "../Curso.model";



interface CusosNavProps {
    modulos: Modulo[];
    onTemaSeleccionado: (temaId: number, moduloId: number,  esQuiz: boolean) => void;
    onQuizSeleccionado: (quizId: number, moduloId: number,  esQuiz: boolean) => void;
    temaSeleccion: {
        id: number;
        esQuiz: boolean;
    };
}

const CusosNav: React.FC<CusosNavProps> = ({ modulos, onTemaSeleccionado, onQuizSeleccionado, temaSeleccion }) => {

    const [modulosVisibles, setModulosVisibles] = useState<Record<number, boolean>>({});

    const toggleModulo = (moduloId: number) => {
        setModulosVisibles((prev) => ({
            ...prev,
            [moduloId]: prev[moduloId] ? false : true,
        }));
    };

    const handleTemaClick = (temaId: number, moduloId: number) => {
        onTemaSeleccionado(temaId, moduloId, false);
    };

    const handleQuizzClick = (quizId: number, moduloId: number) => {
        onQuizSeleccionado(quizId, moduloId, true);
    };

    return (
        <ul className={style.ModulosYTemas}>
            {modulos.map((modulo) => (
                <li key={modulo.id}>
                    <div
                        className={style.ModulosYTemas_Modulo}
                        onClick={() => modulo.visible && toggleModulo(modulo.id)}
                    >
                        {modulo.nombre}

                        {modulosVisibles[modulo.id] ? (
                            <IoChevronUp />
                        ) : (
                            !modulo.visible ? (
                                <IoLockClosed className={style.IconoCandado} />
                            ) : (
                                <IoChevronDown />
                            )
                        )}
                        {modulo.aprobado && (
                            <IoCheckmark className={style.IconoAprobado} />
                        )}
                    </div>
                    {/* Mostrar temas solo si el módulo está visible */}
                    {modulosVisibles[modulo.id] && modulo.visible && (
                        <ul className={style.ModulosYTemas_Temas}>
                            {modulo.temas.map((tema) => (
                                <li
                                    key={tema.id}
                                    className={`${style.ModulosYTemas_Tema}`}
                                    onClick={() => handleTemaClick(tema.id, modulo.id)}
                                >
                                    <IoCaretForward />
                                    <p className={`${temaSeleccion.id === tema.id && !temaSeleccion.esQuiz ? style.TemaSeleccionado : ""}`}>
                                        {tema.titulo}
                                    </p>
                                    {tema.aprobado && (
                                        <IoCheckmark className={style.IconoAprobado} />
                                    )}

                                </li>
                            ))}
                            {/* Mostrar quizz si existe */}
                            {modulo.quizz && (
                                modulo.quizz.map((quizz) => (
                                    <li
                                    key={quizz.id}
                                    className={`${style.ModulosYTemas_Tema} `}
                                    onClick={() => handleQuizzClick(quizz.id, modulo.id)}
                                >
                                    <IoHelpCircleOutline />
                                    <p className={`${temaSeleccion.id === quizz.id && temaSeleccion.esQuiz ? style.TemaSeleccionado : ""}`}>
                                        {quizz.titulo}
                                    </p>
                                    {quizz.realizado && (
                                        <IoCheckmark className={style.IconoAprobado} />
                                    )}
                                </li>
                                ))
                            )}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default CusosNav;

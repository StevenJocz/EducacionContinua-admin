"use client"
import { useState } from 'react';
import style from './Home.module.css'
import { IoCaretForwardCircleOutline, IoSchoolOutline } from "react-icons/io5";
import { fetchCertificados, fetchCursosCard, fetchNewCursosCard } from './Home.service';
import { CursosCard } from '../cursos/cursosCard';
import { Publicidad } from '../publicidad';

const HomeNav = () => {
    const [menu, setMenu] = useState(1);
    const cards = fetchCursosCard();
    const newCards = fetchNewCursosCard();
    const certificados = fetchCertificados();

    return (
        <div className={style.Home_Nav}>
            <ul>
                <li
                    className={`${menu === 1 ? style.Activo : ''}`}
                    onClick={() => setMenu(1)}
                >
                    <IoCaretForwardCircleOutline className={style.Icono} />
                    Mis Cursos
                </li>
                <li
                    className={`${menu === 2 ? style.Activo : ''}`}
                    onClick={() => setMenu(2)}
                >
                    <IoSchoolOutline className={style.Icono} />
                    Mis Certificados
                </li>
            </ul>
            {menu == 1 ? (
                <div className={style.Home_Nav_Content}>
                    <h2>Mis Cursos</h2>
                    <div className={style.Home_Nav_Card_Content}>
                        {cards.map((card, index) => (
                            <CursosCard
                                key={index}
                                id={card.id}
                                title={card.title}
                                image={card.image}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className={style.Home_Nav_Content}>
                    <h2>Mis Certificados</h2>
                    {certificados.length == 0 ?
                        (
                            <div className={style.Home_Nav_Content_SinCertificado}>
                                <h3>Aún no tienes certificados</h3>
                                <p>Aquí encontrarás todos los certificados que obtengas al tomar los cursos de MAO'S Word, puedes obtener un certificado cuando finalizas el curso.</p>
                            </div>

                        ) : (
                            <div className={style.Home_Nav_Card_Content}>
                                {certificados.map((card, index) => (
                                    <CursosCard
                                        key={index}
                                        id={card.id}
                                        title={card.title}
                                        image={card.image}
                                    />
                                ))}
                            </div>
                        )
                    }

                </div>
            )}
            
            < Publicidad/>

            <div className={style.Home_Nav_Content}>
                <h2>Cursos Nuevos</h2>
                <div className={style.Home_Nav_Card_Content}>
                    {newCards.map((card, index) => (
                        <CursosCard
                            key={index}
                            id={card.id}
                            title={card.title}
                            image={card.image}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default HomeNav
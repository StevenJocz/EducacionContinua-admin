import { useState, useEffect, useRef } from 'react';
import style from './Anuncios.module.css';
import { IoFlashOutline } from "react-icons/io5";
import Image from 'next/image';
import { Anuncio } from './Anuncios.models';
import { fetchAnuncios } from './Anuncios.service';
import { blurImagen } from '@/models';

interface Props {
    cursoId: number;
    grupoId: number;
}

const Anuncios: React.FC<Props> = ({ cursoId, grupoId }) => {
    const [anuncios, setAnuncios] = useState(false);
    const [notificacion, setNotificacion] = useState(true);
    const modalRef = useRef<HTMLDivElement>(null);
    const [anunciosData, setAnunciosData] = useState<Anuncio[]>([]);

    const handleAnuncios = () => {
        setAnuncios(!anuncios);
        setNotificacion(false);
    };

    useEffect(() => {
        const Anuncios = fetchAnuncios(cursoId, grupoId)
        setAnunciosData(Anuncios);

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setAnuncios(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [cursoId, grupoId]);

    return (
        <>
            <div className={style.Anuncios} onClick={handleAnuncios}>
                <IoFlashOutline className={style.Anuncios_Icono} />
                <p>Ver anuncios</p>
                {notificacion &&
                    <div className={style.Anuncios_Notificacion}><span>📌</span></div>
                }
            </div>
            <p className={style.Anuncios_P}>Hay {anunciosData.length} anuncios</p>
            {anuncios && anunciosData.length > 0 && (
                <div className={style.Anuncios_Modal} ref={modalRef}>
                    {anunciosData.map((anuncio) => (
                        <div className={style.Anuncios_Modal_Card} key={anuncio.id}>
                            <div className={style.Card_Header}>
                                <Image
                                    src={anuncio.imagenUrl}
                                    className={style.Imagen}
                                    alt="imagen del instructor"
                                    width={40}
                                    height={40}
                                    placeholder="blur"
                                    blurDataURL={blurImagen} // Agregar una imagen de baja resolución
                                />
                                <div className={style.Card_Header_Texto}>
                                    <h2>{anuncio.nombre}</h2>
                                    <p>{anuncio.rol}</p>
                                </div>
                            </div>
                            <div className={style.Card_Content}>
                                <p>{anuncio.mensaje}</p>
                                <a href="">clic aquí</a>
                                <p>{anuncio.fecha}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Anuncios;

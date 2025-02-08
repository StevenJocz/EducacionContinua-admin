import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Tema } from '../Curso.model';
import style from './CursoContenido.module.css';
import calcularProgreso from '@/utils/Curso.progreso';
import { IoArrowForwardOutline, IoCheckmark } from 'react-icons/io5';
import { useCursos } from '@/context/Curso.context';

type CursoContenidoProps = {
  contenido: Tema;
  cursoId: number;
  moduloId: number;
  scrollPercentage: number;
};

const CursosContenido: React.FC<CursoContenidoProps> = ({
  contenido,
  cursoId,
  moduloId,
  scrollPercentage,
}) => {
  const { actualizarProgreso } = useCursos();
  const [felicidades, setFelicidades] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCerrar = () => {

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setFelicidades(false);
    }
  };

  useEffect(() => {
    // Solo verifica el progreso si el tema no está aprobado y el mensaje de felicitaciones no está activo
    const verificarProgreso = async () => {
      if (!contenido.aprobado) {
        await calcularProgreso(
          { id: contenido.id, aprobado: contenido.aprobado, tiempo: contenido.tiempoAporbar },
          cursoId,
          moduloId,
          scrollPercentage,
          actualizarProgreso
        );

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        if (contenido.aprobado) {
          setFelicidades(true);
          timeoutRef.current = setTimeout(() => {
            setFelicidades(false); // Mensaje visible por 10 segundos
          }, 5000);
        }
      }
    };

    verificarProgreso();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

  }, [contenido.id]);


  return (
    <div className={style.CursosContenido}>
      <div className={style.CursosContenido_Encabezado}>
        <h2>{contenido.titulo}</h2>
        {contenido.aprobado && (
          <div className={style.CursosContenido_Continuar}>
            <span className={style.CursosContenido_Aprobado}>
              Completado <IoCheckmark className={style.IconoAprobado} />
            </span>
            <button>Siguiente clase <IoArrowForwardOutline /></button>
          </div>

        )}
      </div>

      {/* Reproductor de video */}
      {contenido.videoUrl && (
        <div className={style.CursosContenido_Reproductor}>
          <ReactPlayer
            url={contenido.videoUrl}
            controls
            width="100%"
            height="460px"
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                  iv_load_policy: 3,
                },
              },
            }}
          />
        </div>
      )}


      {/* Descripción del contenido */}
      <div
        className={style.CursosContenido_Body}
        dangerouslySetInnerHTML={{ __html: contenido.descripcion }}
      />
      {contenido.aprobado && (
        <div className={style.CursosContenido_Continuar}>
          <button>Siguiente clase <IoArrowForwardOutline /></button>
        </div>
      )}
      {/* Mensaje de felicitaciones */}
      {felicidades && contenido.aprobado && (
        <div className={style.Felicidades} onClick={handleCerrar}>
          <p>¡Felicidades! Has completado este tema.</p>
          <button>OK</button>
        </div>
      )}
    </div>
  );
};

export default CursosContenido;

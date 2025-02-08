import Image from 'next/image'
import style from './CursoRecursos.module.css'
import drive from '../../../../../public/img/drive.png'
import pdf from '../../../../../public/img//pdf.png'
import { blurImagen } from '@/models';

interface Props {
  driveEnlace: string ;
}


const CursoRecursos : React.FC<Props> = ({ driveEnlace }) => {
  return (
    <div className={style.CursoRecursos}>
      <h4>PDF's y Recursos</h4>
      <div className={style.CursoRecursos_Content}>
        <a href={driveEnlace} target='_blank'>
          <div className={style.CursoRecursos_Content_Card}>
            <h2>Recursos</h2>
            <Image
              src={drive}
              className={style.Imagen}
              alt="svg"
              width={80}
              height={80}
              placeholder="blur" // Activa el efecto de desenfoque
              blurDataURL={blurImagen}
            />
            <h3>Recursos del curso</h3>
          </div>
        </a>
        <div className={style.CursoRecursos_Content_Card}>
          <h2>PDF's</h2>
          <Image
            src={pdf}
            className={style.Imagen}
            alt="svg"
            width={80}
            height={80}
            placeholder="blur" // Activa el efecto de desenfoque
            blurDataURL={blurImagen}
          />
          <h3>PDF's del curso</h3>
        </div>
      </div>
    </div>
  )
}

export default CursoRecursos
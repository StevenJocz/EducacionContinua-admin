import Image from 'next/image'
import style from './cursoInstructor.module.css'
import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";
import { Instructor } from '../Curso.model';
import { blurImagen } from '@/models';

interface Props {
    instructor: Instructor[];
}

const CursoInstructor: React.FC<Props> = ({ instructor }) => {
    return (
        <div className={style.CursoInstructor}>
            <h4>Instructor</h4>
            {instructor.map((instructor) => (
                <div className={style.CursoInstructor_Content} key={instructor.id}>
                    <Image
                        src={instructor.foto}
                        className={style.Imagen}
                        alt="svg"
                        width={400}
                        height={300}
                        placeholder="blur" // Activa el efecto de desenfoque
                        blurDataURL={blurImagen} // Agrega una URL de baja resolución
                    />
                    <div className={style.CursoInstructor_Content_Informacion}>
                        <h2>{instructor.nombre}</h2>
                        <h3>{instructor.titulo}</h3>
                        <p>{instructor.descripcion}</p>
                        <IoLogoFacebook className={`${style.Icono}`} />
                        <IoLogoInstagram className={`${style.Icono}`} />
                    </div>
                </div>
            ))}

        </div>
    )
}

export default CursoInstructor
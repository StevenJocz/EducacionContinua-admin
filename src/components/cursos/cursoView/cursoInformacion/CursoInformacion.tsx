import style from './CursoInformacion.module.css'
import { IoInformationCircleOutline, IoFlowerOutline, IoGlassesOutline, IoPodiumOutline, IoColorPaletteOutline, IoStarOutline } from "react-icons/io5";

interface Props {
    descripcion: string | null;
}

const CursoInformacion : React.FC<Props> = ({descripcion }) =>{
    return (
        <div className={style.CursosContenido_Informacion}>
            <h4>Información</h4>
            <div className={style.CursosContenido_Informacion_Content}>
                <IoInformationCircleOutline className={style.Icono} />
                <p>{descripcion}</p>
            </div>
            <div className={style.CursosContenido_Informacion}>
                <h4>¡Gana Recompensas por Tu Esfuerzo en MAO Word!</h4>
                <p>Cada vez que completes un módulo o un tema, recibirás recompensas exclusivas para personalizar tu avatar MAO. Desde coloridas flores hasta elegantes gafas, sombreros y macetas únicas, cada logro en tu aprendizaje desbloquea un nuevo objeto para tu cactus. ¡Avanza en tus cursos, haz que tu MAO sea único y muestra tu progreso con orgullo!</p>
                <ul>
                    <li>
                        <div className={style.CursosContenido_Informacion_Icono}>
                            <IoFlowerOutline className={style.Informacion_Icono} />
                        </div>
                        <p>Flores decorativas: Dale un toque especial a tu avatar.</p>
                    </li>
                    <li>
                        <div className={style.CursosContenido_Informacion_Icono}>
                            <IoGlassesOutline className={style.Informacion_Icono} />
                        </div>
                        <p>Gafas geniales: Personaliza el estilo de tu MAO.</p>
                    </li>
                    <li>
                        <div className={style.CursosContenido_Informacion_Icono}>
                            <IoStarOutline className={style.Informacion_Icono} />
                        </div>
                        <p>Sombreros únicos: Desde elegantes hasta divertidos.</p>
                    </li>
                    <li>
                        <div className={style.CursosContenido_Informacion_Icono}>
                            <IoPodiumOutline className={style.Informacion_Icono} />
                        </div>
                        <p>Macetas exclusivas: Cambia su base por diseños creativos.</p>
                    </li>
                    <li>
                        <div className={style.CursosContenido_Informacion_Icono}>
                            <IoColorPaletteOutline className={style.Informacion_Icono} />
                        </div>
                        <p>Colores especiales: Personaliza su apariencia con tonos únicos.</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CursoInformacion
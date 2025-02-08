import { useState } from 'react';
import style from './Items.module.css'
import {
    IoFolderOpen,
    IoHelpCircle,
    IoMedal,
    IoChatboxEllipses
} from "react-icons/io5";
import { ItemsConversacion } from './itemsConversacion';

interface Props {
    cursoId: number;
    grupoId: number;
}

const Items: React.FC<Props> = ({ cursoId, grupoId }) => {
    const [verConversacion, setVerConversacion] = useState(false);
    const [notificacion, setNotificacion] = useState(true);

    const handleVerConversacion = () => {
        setVerConversacion(!verConversacion);
        setNotificacion(false);
    }

    return (
        <div className={style.Items}>
            <h4>Recursos</h4>
            <div className={style.Items_Content}>
                <div className={style.Items_Content_Card}>
                    <div className={style.Curso_circulo}>
                        <IoFolderOpen className={style.Curso_Icono} />
                    </div>
                    <h5>Evidencias</h5>
                </div>
                <div className={style.Items_Content_Card} onClick={handleVerConversacion}>
                    <div className={style.Curso_circulo}>
                        <IoChatboxEllipses className={style.Curso_Icono} />
                        {notificacion &&
                            <div className={style.Curso_circulo_notificacion}><span>📢</span></div>
                        }
                    </div>
                    <h5>Grupo de conversación</h5>
                </div>
                <div className={style.Items_Content_Card}>
                    <div className={style.Curso_circulo}>
                        <IoHelpCircle className={style.Curso_Icono} />
                    </div>
                    <h5>Ayuda</h5>
                </div>
                <div className={style.Items_Content_Card}>
                    <div className={style.Curso_circulo}>
                        <IoMedal className={style.Curso_Icono} />
                    </div>
                    <h5>Calificaciones</h5>
                </div>
            </div>
            {verConversacion &&
                <ItemsConversacion
                    idCurso={cursoId}
                    idGrupo={grupoId}
                    onClose={handleVerConversacion}
                />
            }
        </div>
    )
}

export default Items
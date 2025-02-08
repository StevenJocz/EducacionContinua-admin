import { IoCloseCircle, IoNavigateOutline, IoHeartOutline } from 'react-icons/io5'
import style from './ItemsConversacion.module.css'
import AddConversacion from './ItemsConversacion.add';
import { useEffect, useState } from 'react';
import { Comentario } from './ItemsConversacion.models';
import { fetchComentarios } from './ItemsConversacion.service';

interface Props {
    idCurso: number;
    idGrupo: number;
    onClose: () => void;
}

const ItemsConversacion: React.FC<Props> = ({ idCurso, idGrupo, onClose }) => {
    const [comentariosData, setComentariosData] = useState<Comentario[]>([]);
    const [addConvercion, setAddConvercion] = useState(false);

    const handleAddConversacion = () => {
        setAddConvercion(!addConvercion);
    }

    useEffect(() => {
        const comentarios = fetchComentarios(idGrupo)
        setComentariosData(comentarios);
    }, [idGrupo, idGrupo]);

    return (
        <aside className={style.Conversacion}>
            <div className={style.Conversacion_Header}>
                <h3>Grupo de conversación</h3>
                <IoCloseCircle
                    className={style.Conversacion_Header_Icono}
                    onClick={onClose}
                />
            </div>
            {addConvercion ? (
                < AddConversacion
                    idCurso={idCurso}
                    idGrupo={idGrupo}
                    onClose={handleAddConversacion}
                />
            ) : (
                <div className={style.Conversacion_Add} onClick={handleAddConversacion}>
                    <p>Escribe tu comentario o pregunta</p>
                    <IoNavigateOutline />
                </div>
            )}

            <div className={style.Conversacion_Content}>
                {comentariosData.map((comentario) => (
                    <div className={style.Content_Comentario} key={comentario.id}>
                        <div className={style.Content_Comentario_Left}>
                            <img src={comentario.usuario.avatar} alt="" />
                            <div>
                                <IoHeartOutline className={style.Icono} />
                                <p>{comentario.likes}</p>
                            </div>
                            <div className={style.Content_Comentario_Left_Linea}></div>
                        </div>
                        <div className={style.Content_Comentario_Right}>
                            <div className={style.Content_Comentario_Right_Content}>
                                <div className={style.Content_Comentario_Right_Content_Encabezado}>
                                    <h3>{comentario.usuario.nombre}</h3>
                                    <h4>{comentario.usuario.rol} - {comentario.fecha}</h4>
                                </div>
                                <div className={style.Content_Comentario_Right_Content_Body}>
                                    <p>{comentario.texto}</p>
                                </div>
                            </div>
                            <div className={style.Content_Comentario_Right_Content_Responder}>
                                <p><IoHeartOutline className={style.Icono} />Responder</p>
                            </div>
                            {comentario.respuestas.map((respuesta) => (

                                <div className={style.Content_Comentario_Right_Content_Respuesta} key={respuesta.id}>
                                    <div className={style.Respuesta_Encabezado}>
                                        <img src={respuesta.usuario.avatar} alt="" />
                                        <div>
                                            <IoHeartOutline className={style.Icono} />
                                            <p>{respuesta.likes}</p>
                                        </div>
                                        <div className={style.Respuesta_Linea}></div>
                                    </div>
                                    <div className={style.Respuesta_Body}>
                                        <div className={style.Respuesta_Body_Encabezado}>
                                            <h3>{respuesta.usuario.nombre}</h3>
                                            <h4>{respuesta.usuario.rol} - {respuesta.fecha}</h4>
                                        </div>
                                        <div className={style.Respuesta_Body_Content}>
                                            <p>{respuesta.texto}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    )
}

export default ItemsConversacion
import style from './CursoProgreso.module.css'

interface Props {
    progreso: number | null;
}

const CursoProgreso: React.FC<Props> = ({ progreso }) => {
    const progresoWidth = progreso !== null ? `${progreso}%` : '0%';
    return (
        <div className={style.CursosContenido_Progreso}>
            <h4>Progreso del Curso</h4>
            <h5>{progreso}%</h5>
            <div className={style.Progreso}>
                <div
                    className={style.Progreso_inner}
                    style={{ width: progresoWidth }}>

                </div>
            </div>
        </div>
    )
}

export default CursoProgreso
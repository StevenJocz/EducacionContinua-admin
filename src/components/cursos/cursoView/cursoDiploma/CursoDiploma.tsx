import { IoSchoolOutline } from 'react-icons/io5'
import style from './CursoDiploma.module.css'

const CursoDiploma = () => {
    return (
        <div className={style.CursoDiploma}>
            <h4>Descargar diploma</h4>
            <IoSchoolOutline   className={style.CursoDiploma_Icono} />
        </div>
    )
}

export default CursoDiploma
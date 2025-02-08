import Image from 'next/image'
import style from './Mao.module.css'
import maoDos from '../../../public/img/MaoDos.png'
import { blurImagen } from '@/models'

const Mao = () => {
    return (
        <div className={style.Mao}>
            <div className={style.Mao_Content}>
                <div className={`${style.span} ${style.span_1}`}></div>
                <div className={`${style.span} ${style.span_2}`}></div>
                <div className={`${style.span} ${style.span_3}`}></div>
                <div className={`${style.span} ${style.span_4}`}></div>
                <Image
                    src={maoDos}
                    className={style.Mao_Content_Imagen}
                    alt="Imagen de invitación mao"
                    width={130}
                    height={130}
                    placeholder="blur"
                    blurDataURL={blurImagen}
                />
            </div>
        </div>
    )
}

export default Mao
import style from './Publicidad.module.css'
import mao from '../../../public/img/MaoDos.png'
import Image from 'next/image'
import Link from 'next/link'
import { blurImagen } from '@/models'

const Publicidad = () => {
    return (
        <div className={style.Publicidad}>
            <div>
                <h2><span>Promociona lo que desees aquí</span></h2>
                <h3>Publicita cualquier curso, evento o lo que desees</h3>
                <Link href={'#'}
                    className={style.Primary}
                    type="submit"
                >
                    Más información

                </Link>
            </div>
            <Image
                src={mao}
                className={style.Imagen}
                alt="Mao de publicidad"
                width={200}
                height={200}
                placeholder="blur"
                blurDataURL={blurImagen}
            />
        </div>
    )
}

export default Publicidad
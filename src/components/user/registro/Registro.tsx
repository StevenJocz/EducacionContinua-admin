import Image from 'next/image'
import style from './Registro.module.css'
import mao from '../../../../public/img/MaoDos.png'
import { blurImagen, Routes } from '@/models'
import Link from 'next/link'
import Formulario from './Registro.formulario'
const Registro = () => {
    return (
        <div className={style.Registro}>
            <div className={style.Registro_Content}>
                <div className={style.Registro_Content_Text}>
                    <h2><span>¡Únete a MAO'S Word y Transforma Tu Aprendizaje!</span></h2>
                    <Image
                        src={mao}
                        className={style.Imagen}
                        alt="Imagen de fondo mao uno"
                        width={500}
                        height={500}
                        placeholder="blur"
                        blurDataURL={blurImagen}
                    />
                </div>
                <div className={style.Registro_Content_Formulario}>
                    <h2><span>Regístrate</span></h2>
                    <Formulario />
                    <p className={style.Registro_Content_Body_Aviso}>
                        Al continuar con tu correo aceptas los
                        <Link href={Routes.TERMINOS.path}>términos y condiciones</Link>
                        y el
                        <Link href={Routes.PRIVACIDAD.path}>aviso de privacidad</Link>
                    </p>
                    <div className={style.Registro_Content_Body_Registro}>
                        <Link href={Routes.LOGIN.path}>¿Ya tienes cuenta? <span>Inicia sesión </span></Link>
                    </div>
                </div>
            </div>
            <footer className={style.Registro_Footer}>
                <p>© 2024 desarrollado por Hamilton Espinal para MAO'S WORD. Todos los derechos reservados.</p>
            </footer>
        </div>
    )
}

export default Registro
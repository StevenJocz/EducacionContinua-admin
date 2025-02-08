
import Image from 'next/image';
import style from './Inicio.module.css'
import maoUno from '../../../../public/img/maoUno.png'
import maoDos from '../../../../public/img/MaoDos.png'
import svg from '../../../../public/svg/stroke.svg'
import Link from 'next/link';
import Formulario from './Inicio.formulario';
import { blurImagen, Routes } from '@/models';


function Inicio() {
    return (
        <div className={style.Inicio}>
            <Link href={Routes.HOME.path}>
                <h1><span>MAO'S Word</span></h1>
            </Link>
            <div className={style.Inicio_Content}>
                <div className={style.Inicio_Content_Body}>
                    <h2><span>Inicia sesión</span></h2>
                    <Formulario />
                    <div className={style.Inicio_Content_Olvide}>
                        <Link href={Routes.NEWPASSWORD.path}> Olvide mi contraseña</Link>
                    </div>
                    <p className={style.Inicio_Content_Body_Aviso}>
                        Al continuar con tu correo aceptas los
                        <Link href={Routes.TERMINOS.path}>términos y condiciones</Link>
                        y el
                        <Link href={Routes.PRIVACIDAD.path}>aviso de privacidad</Link>
                    </p>
                    <div className={style.Inicio_Content_Body_Registro}>
                        <Link href={Routes.REGISTRO.path}>¿No tienes una cuenta? <span>Regístrate</span></Link>
                    </div>
                </div>
            </div>
            <footer className={style.Footer}>
                <p>© 2024 desarrollado por Hamilton Espinal para MAO'S WORD. Todos los derechos reservados.</p>
            </footer>
            <Image
                src={maoDos}
                className={style.ImagenUno}
                alt="Imagen de fondo mao uno"
                width={500}
                height={500}
                placeholder="blur"
                blurDataURL={blurImagen}
            />
            <Image
                src={maoUno}
                className={style.ImageDos}
                alt="Imagen de fondo mao dos"
                width={500}
                height={500}
                placeholder="blur"
                blurDataURL={blurImagen}
            />
            <Image
                src={svg}
                className={style.svg}
                alt="Imagen de fondo svg"
                width={800}
                height={800}
                placeholder="blur"
                blurDataURL={blurImagen}
            />
        </div>
    )
}

export default Inicio
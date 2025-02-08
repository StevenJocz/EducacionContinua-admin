import Link from 'next/link'
import style from './Nav.module.css'
import Navigator from '../routes/Navigator'
import { Routes } from '@/models'
import NavPerfil from './navPerfil/NavPerfil';

interface NavProps {
  theme: 'dark' | 'light';  // Prop para definir el tema
}

const Nav: React.FC<NavProps> = ({ theme }) => {
  return (
    <nav className={`${style.Nav} ${theme === 'dark' ? style.dark : ''}`}>
      <Link href={Routes.HOME.path}>
        <h3>Educación Continua</h3>
      </Link>
      <ul className={style.Nav_Link}>
        <Navigator pathNames={[Routes.DASHBOARD, Routes.PRODUCTOS, Routes.MAOS, Routes.BLOG, Routes.CONTACTENOS]} />
        <li>En</li>
      </ul>
      <div className={style.Nav_Perfil}>
        <NavPerfil  theme={theme}/>

      </div>
    </nav>
  )
}

export default Nav;

import styles from './Button.module.css'
import Link from "next/link";
import { IoArrowForward } from 'react-icons/io5';
import { Routes } from "@/models/Routes.models";

interface Props {
    type: number;
    text: string;
}


const Button = ({ type, text }: Props) => {
    return (
        <div className={styles.Button}>
            {type === 1 ? (
                <button
                    className={styles.Primary}
                    type="submit"
                    >
                    {text}
                    
                </button>
            ) : (
                <Link
                    href={Routes.BLOG.path}
                    className={styles.LeerMas}>
                    Leer Más
                    <IoArrowForward className={styles.Icono} />
                </Link>
            )}
        </div>
    );
}

export default Button;
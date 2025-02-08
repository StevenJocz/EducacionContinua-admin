import { blurImagen, Card, Routes } from "@/models";
import style from './CursosCard.module.css';
import Image from "next/image";
import Link from "next/link";

const CursosCard: React.FC<Card> = ({ id, title, image }) => {
    const parametros = `${id}|${title}`;
    // Codificamos en Base64
    const codificado = Buffer.from(parametros).toString('base64');
    return (
        <Link
            href={`${Routes.STUDENT.path}/${codificado}`}
            className={style.Link}>
            <div className={style.CursosCard} >
                <Image
                    src={image}
                    className={style.Imagen}
                    alt={title}
                    width={385}
                    height={200}
                    placeholder={blurImagen}
                    blurDataURL="data:image/svg+xml;base64,..."
                />
                <h2 className={style.title}>{title}</h2>
            </div>
        </Link>
    );
};

export default CursosCard;

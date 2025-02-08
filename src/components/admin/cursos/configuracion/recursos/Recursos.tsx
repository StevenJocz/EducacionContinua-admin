import Image from 'next/image';
import { useEffect, useState } from 'react';
import style from './Recursos.module.css';
import drive from '../../../../../../public/img/drive.png';
import pdf from '../../../../../../public/img/pdf.png';
import { blurImagen } from '@/models';
import { StyledTextField } from '@/utils/MaterialUI';
import { RecursosModel } from './Recursos.model';
import { fetchRecursos } from './Recursos.service';

interface Props {
    idCurso: number;
}

const Recursos: React.FC<Props> = ({ idCurso }) => {
    const [recursos, setRecursos] = useState<RecursosModel[]>([]);
    const [driveLink, setDriveLink] = useState<string>('');
    const [pdfLink, setPdfLink] = useState<string>('');

    useEffect(() => {
        if (idCurso === 0) return;
        handleRecursos(idCurso);
    }, [idCurso]);

    const handleRecursos = async (id: number) => {
        const recursoData = await fetchRecursos(id);
        setDriveLink(recursoData[0].fuente);
        setPdfLink(recursoData[1].fuente);
    };

    const handleSave = (tipo: number, fuente: string) => {
        const newRecurso: RecursosModel = {
            id: recursos.length + 1,
            tipo,
            fuente,
        };

        setRecursos((prevRecursos) => [...prevRecursos, newRecurso]);
        console.log('Recurso guardado:', newRecurso);
    };

    const handleDriveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDriveLink(e.target.value); 
    };

    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPdfLink(e.target.value);
    };

    return (
        <div className={style.Recursos}>
            <h2>PDF's y Recursos</h2>
            <div className={style.CursoRecursos_Content}>
                {/* Recurso Google Drive */}
                <div className={style.CursoRecursos_Content_Card}>
                    <div>
                        <Image
                            src={drive}
                            className={style.Imagen}
                            alt="Drive"
                            width={25}
                            height={25}
                            placeholder="blur"
                            blurDataURL={blurImagen}
                        />
                        <h2>Recursos</h2>
                    </div>
                    <div className={style.Formulario_Input_Content}>
                        <StyledTextField
                            name="enlace"
                            label="Enlace Google Drive"
                            variant="outlined"
                            size="small"
                            color="secondary"
                            placeholder="Ejemplo: https://drive.google.com/file/d/XXXXX/view"
                            onChange={handleDriveChange}
                            value={driveLink} 
                        />
                        <button onClick={() => handleSave(1, driveLink)}>Guardar</button>
                    </div>
                </div>

                <div className={style.CursoRecursos_Content_Card}>
                    <div>
                        <Image
                            src={pdf}
                            className={style.Imagen}
                            alt="PDF"
                            width={25}
                            height={25}
                            placeholder="blur"
                            blurDataURL={blurImagen}
                        />
                        <h2>PDF's</h2>
                    </div>
                    <div className={style.Formulario_Input_Content}>
                        <StyledTextField
                            name="enlacepdf"
                            label="Enlace PDF"
                            variant="outlined"
                            size="small"
                            color="secondary"
                            placeholder="Ejemplo: https://drive.google.com/file/d/XXXXX/view"
                            onChange={handlePdfChange}
                            value={pdfLink}
                        />
                        <button onClick={() => handleSave(2, pdfLink)}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recursos;

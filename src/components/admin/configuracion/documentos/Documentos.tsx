import { Tabla } from '@/components/tabla';
import style from './Documentos.module.css'
import { IoAdd } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { fetchData } from './Documentos.service';
import { DocumentoModel } from './Documentos.model';
import AddDocumentos from './AddDocumentos';

const Documentos = () => {
    const [data, setData] = useState<DocumentoModel[]>([])
    const [add, setAdd] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        handleData();
    }, []);

    const handleData = async () => {
        const dataFetch: DocumentoModel[] = await fetchData();
        setData(dataFetch);
    };

    const handleAdd = (id: number) => {
        setId(id);
        setAdd(!add);
    }

    const handleOnClose = () => {
        setAdd(false);
        handleData();
    }

    return (
        <div className={style.Documentos}>
            <h2>Documentos</h2>
            <p>En esta sección puedes administrar los tipos de documentos de identificación.</p>
            <button
                className={style.Documentos_Button}
                onClick={() => handleAdd(0)}
            >
                <IoAdd />
                Agregar documento
            </button>
            <Tabla
                data={data}
                verBotonEditar={true}
                mostrarRegistro={handleAdd}
            />
            {add &&
                <AddDocumentos id={id} onClose={() => handleOnClose()} />
            }
        </div>
    )
}

export default Documentos
import { Tabla } from '@/components/tabla';
import style from './Dependencias.module.css'
import { IoAdd } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import AddDependencia from './AddDependencia';
import { Dependencia } from './Dependencias.model';
import { fetchDependecias } from './Dependencias.service';

const Dependencias = () => {
    const [data, setData] = useState<Dependencia[]>([])
    const [add, setAdd] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        handleData();
    }, []);

    const handleData = async () => {
        const dataFetch:Dependencia[] = await fetchDependecias();
        setData(dataFetch);
    };

    const handleAdd= (id: number) => {
        setId(id);
        setAdd(!add);
    }

    const handleOnClose= () => {;
        setAdd(false);
        handleData();
    }

    return (
        <div className={style.Dependencias}>
            <h2>Dependencias</h2>
            <p>En esta sección puedes administrar las dependencias.</p>
            <button
                className={style.Dependencias_Button}
                onClick={() => handleAdd(0)}
            >
                <IoAdd />
                Agregar dependencia
            </button>
            <Tabla
                data={data}
                verBotonEditar={true}
                mostrarRegistro={handleAdd}
            />
            {add &&
                <AddDependencia id={id} onClose={() => handleOnClose()} />
            }
        </div>
    )
}

export default Dependencias
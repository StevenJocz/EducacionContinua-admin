import { IoAdd } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { ViasModel } from './Vias.model';
import { fetchData } from './Vias.service';
import style from './Vias.module.css'
import { Tabla } from '@/components/tabla';
import AddVias from './AddVias';


const Vias = () => {
    const [data, setData] = useState<ViasModel[]>([])
    const [add, setAdd] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        handleData();
    }, []);

    const handleData = async () => {
        const dataFetch: ViasModel[] = await fetchData();
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
        <div className={style.Vias}>
            <h2>Tipos de tipos de direcciones</h2>
            <p>En esta sección puedes administrar los tipos de direcciones.</p>
            <button
                className={style.Vias_Button}
                onClick={() => handleAdd(0)}
            >
                <IoAdd />
                Agregar tipo de dirección
            </button>
            <Tabla
                data={data}
                verBotonEditar={true}
                mostrarRegistro={handleAdd}
            />
            {add &&
                <AddVias id={id} onClose={() => handleOnClose()} />
            }
        </div>
    )
}

export default Vias
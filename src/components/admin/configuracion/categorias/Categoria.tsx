import { IoAdd } from 'react-icons/io5';
import style from './Categoria.module.css'
import { CategoriaModel } from './Categoria.model';
import { useEffect, useState } from 'react';
import { Tabla } from '@/components/tabla';
import { fetchCategorias } from './Categoria.service';
import AddCategoria from './AddCategoria';

const Categoria = () => {
    const [data, setData] = useState<CategoriaModel[]>([])
    const [add, setAdd] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        handleData();
    }, []);

    const handleData = async () => {
        const dataFetch:CategoriaModel[] = await fetchCategorias();
        setData(dataFetch);
    };

    const handleAdd = (id: number) => {
        setId(id);
        setAdd(!add);
    }

    const handleOnClose= () => {;
        setAdd(false);
        handleData();
    }
    return (
        <div className={style.Categoria}>
            <h2>Categorías</h2>
            <p>En esta sección puedes administrar las categorías.</p>
            <button
                className={style.Categoria_Button}
                onClick={() => handleAdd(0)}
            >
                <IoAdd />
                Agregar categoría
            </button>
            <Tabla
                data={data}
                verBotonEditar={true}
                mostrarRegistro={handleAdd}
            />
            {add &&
                <AddCategoria id={id} onClose={() => handleOnClose()} />
            }
        </div>
    )
}

export default Categoria
import React, { useEffect, useState } from 'react'
import { FaqsModel } from './FAQS.model';
import { fetchData } from './FAQS.service';
import style from './FAQS.module.css'
import { IoAdd } from 'react-icons/io5';
import { Tabla } from '@/components/tabla';
import AddFAQS from './AddFAQS';

const FAQS = () => {
    const [data, setData] = useState<FaqsModel[]>([])
    const [add, setAdd] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        handleData();
    }, []);

    const handleData = () => {
        const dataFetch = fetchData();
        setData(dataFetch);
    }

    const handleAdd = (id: number) => {
        setId(id);
        setAdd(!add);
    }
    return (
        <div className={style.Faqs}>
            <h2>Preguntas frecuentes</h2>
            <p>En esta sección puedes administrar las preguntas frecuentes y sus respuestas.</p>
            <button
                className={style.Faqs_Button}
                onClick={() => handleAdd(0)}
            >
                <IoAdd />
                Agregar pregunta frecuente
            </button>
            <Tabla
                data={data}
                verBotonEditar={true}
                mostrarRegistro={handleAdd}
            />
            {add &&
                <AddFAQS id={id} onClose={() => setAdd(false)} />
            }
        </div>
    )
}

export default FAQS
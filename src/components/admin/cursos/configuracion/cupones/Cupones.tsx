import { useEffect, useState } from 'react';
import style from './Cupones.module.css'
import { CuponesModel } from './Cupones.model';
import { IoAdd, IoPencil } from 'react-icons/io5';
import AddCupones from './AddCupones';
import { fetchCupones } from './Cupones.service';

interface Props {
    idCurso: number;
}

const Cupones: React.FC<Props> = ({ idCurso }) => {
    const [cupones, setCupones] = useState<CuponesModel[]>([]);

    useEffect(() => {
        handleCupones(idCurso);

    }, [idCurso]);

    const handleCupones = async (id: number) => {
        const cuponesData = await fetchCupones(id);
        setCupones(cuponesData);
    };

    // Agregar Grupo
    const [addCupon, setAddCupon] = useState(false);
    const [idCupon, setIdCupon] = useState(0);

    const handleAddCupon = (idCupon: number) => {
        setIdCupon(idCupon);
        setAddCupon(!addCupon);
    };
    return (
        <div className={style.Cupones}>
            <h2>Cupones</h2>
            <button
                className={style.Cupones_Boton}
                onClick={() => handleAddCupon(0)}
            >
                <IoAdd />
                Crear cupon
            </button>
            <div className={style.Cupones_Content}>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <span>Cupon</span>
                            </th>
                            <th>
                                <span>Fecha Inicio</span>
                            </th>
                            <th>
                                <span>Fecha Fin</span>
                            </th>
                            <th>
                                <span>Código</span>
                            </th>
                            <th>
                                <span>Descuento</span>
                            </th>
                            <th>
                                <span>Estado</span>
                            </th>
                            <th>
                                <span>Acciones</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cupones.map((cupon) => (
                            <tr key={cupon.id}>
                                <td><span>{cupon.titulo}</span></td>
                                <td><span>{cupon.fechaInicio.toLocaleDateString()}</span></td>
                                <td><span>{cupon.fechaFin.toLocaleDateString()}</span></td>
                                <td><span>{cupon.codigo}</span></td>
                                <td><span>{cupon.descuento}</span></td>
                                <td>
                                    <span className={cupon.estado ? style.Estado_Activo : style.Estado_NoActivo}>
                                        {cupon.estado ? 'Activo' : 'No Activo'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className={style.Boton_Editar}
                                        onClick={() => handleAddCupon(cupon.id)}
                                    >
                                        <IoPencil />
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {addCupon && (
                <AddCupones
                    idCurso={idCurso}
                    idCupon={idCupon}
                    onClose={() => handleAddCupon(0)}
                />
            )}
        </div>
    )
}

export default Cupones
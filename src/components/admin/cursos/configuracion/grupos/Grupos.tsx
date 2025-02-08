import { IoAdd, IoPencil } from 'react-icons/io5';
import style from './Grupos.module.css'
import { useEffect, useState } from 'react';
import AddGrupo from './AddGrupo';
import { GrupoModel } from './Grupos.model';
import { fetchGrupo } from './Grupos.service';
import { formatPrice } from '@/utils/FormatearPrecio';

interface Props {
  idCurso: number;
}

const Grupos: React.FC<Props> = ({ idCurso }) => {

  const [grupos, setGrupos] = useState<GrupoModel[]>([]);

  useEffect(() => {
    handleGrupo(idCurso);

  }, [idCurso]);

  const handleGrupo = async (id: number) => {
    const gruposData = await fetchGrupo(id);
    setGrupos(gruposData);
  };

  // Agregar Grupo
  const [addGrupo, setAddGrupo] = useState(false);
  const [idGrupo, setIdGrupo] = useState(0);

  const handleAddGrupo = (idGrupo: number) => {
    setIdGrupo(idGrupo);
    setAddGrupo(!addGrupo);
  };

  return (
    <div className={style.Grupos}>
      <h2>Grupos</h2>
      <button
        className={style.Grupo_Boton}
        onClick={() => handleAddGrupo(0)}
      >
        <IoAdd />
        Crear grupo
      </button>
      <div className={style.Grupo_Content}>
        <table>
          <thead>
            <tr>
              <th>
                <span>Grupo</span>
              </th>
              <th>
                <span>Fecha Inicio</span>
              </th>
              <th>
                <span>Fecha Fin</span>
              </th>
              <th>
                <span>Precio</span>
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
            {grupos.map((grupo) => (
              <tr key={grupo.id}>
                <td><span>{grupo.nombre}</span></td>
                <td><span>{grupo.fechaInicio.toLocaleDateString()}</span></td>
                <td><span>{grupo.fechaFin.toLocaleDateString()}</span></td>
                <td><span>${formatPrice(grupo.precio)}</span></td>
                <td>
                  <span className={grupo.estado ? style.Estado_Activo : style.Estado_NoActivo}>
                    {grupo.estado ? 'Activo' : 'No Activo'}
                  </span>
                </td>
                <td>
                  <button
                    className={style.Boton_Editar}
                    onClick={() => handleAddGrupo(grupo.id)}
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

      {addGrupo && (
        <AddGrupo
          idCurso={idCurso}
          idGrupo={idGrupo}
          onClose={() => handleAddGrupo(0)}
        />
      )}
    </div>
  )
}

export default Grupos
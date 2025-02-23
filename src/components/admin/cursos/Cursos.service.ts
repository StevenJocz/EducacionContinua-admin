import api from "@/service/Api.service";
import { ListCurso } from "./Cursos.model";

export const fetchListaCursos =  async () => {
    const response = await api.get<ListCurso[]>('Cursos/GetAllCursosAdmin');
    return response.data; 
};
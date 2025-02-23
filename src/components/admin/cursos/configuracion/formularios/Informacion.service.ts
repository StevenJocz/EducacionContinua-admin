import api from "@/service/Api.service";
import { InformacionCurso } from "./Informacion.modl";

export const fetchCurso = async (id: number) => {
    const response = await api.get<InformacionCurso>('Cursos/GetCursosByIdAdmin', { id: id });
    return response.data;

};
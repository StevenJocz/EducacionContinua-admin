import api from "@/service/Api.service";
import { ViasModel } from "./Vias.model";

export const fetchId = async (id: number) => {
    const response = await api.get<ViasModel>('TipoDirecciones/GetTipoDireccionById', {id : id});
    return response.data;
};

export const fetchData = async () => {
    const response = await api.get<ViasModel[]>('TipoDirecciones/GetAllTiposDirecciones');
    return response.data; 
};


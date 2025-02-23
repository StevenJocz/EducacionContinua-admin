import api from "@/service/Api.service";
import { Dependencia } from "./Dependencias.model";

export const fetchIdDependecia = async (id: number) => {
    const response = await api.get<Dependencia>('Dependencias/GetDependenciasById', {id : id});
    return response.data;
};

export const fetchDependecias = async () => {
    const response = await api.get<Dependencia[]>('Dependencias/GetAllDependencias');
    return response.data; 
};
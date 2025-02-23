import api from "@/service/Api.service";
import { ConveniosModel } from "./Convenios.model";

export const fetchData = async () => {
    const response = await api.get<ConveniosModel[]>('Convenios/GetAllConvenios');
    return response.data; 
};

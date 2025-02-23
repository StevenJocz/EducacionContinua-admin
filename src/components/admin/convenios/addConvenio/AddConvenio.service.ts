import api from "@/service/Api.service";
import { ConvenioIdModel } from "./AddConvenio.model";

export const fetchIdConvenio = async (id: number) => {
    const response = await api.get<ConvenioIdModel>('TipoDirecciones/GetTipoDireccionById', {id : id});
    return response.data;
};

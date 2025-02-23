import api from "@/service/Api.service";
import { DocumentoModel } from "./Documentos.model";


export const fetchId = async (id: number) => {
    const response = await api.get<DocumentoModel>('TipoDocumentos/GetTipoDocumentoById', {id : id});
    return response.data;
};

export const fetchData =  async () => {
    const response = await api.get<DocumentoModel[]>('TipoDocumentos/GetAllTiposDocumentos');
    return response.data; 
};
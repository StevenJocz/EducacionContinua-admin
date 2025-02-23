import api from "@/service/Api.service";
import { FaqsModel } from "./FAQS.model";

export const fetchId = async (id: number) => {
    const response = await api.get<FaqsModel>('Faqs/GetFaqById', {id : id});
    return response.data;
};

export const fetchData = async () => {
    const response = await api.get<FaqsModel[]>('Faqs/GetAllFaqs');
    return response.data; 
};
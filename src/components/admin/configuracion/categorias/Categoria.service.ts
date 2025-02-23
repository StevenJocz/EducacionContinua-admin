import api from "@/service/Api.service";
import { CategoriaModel } from "./Categoria.model";

export const fetchIdCategoria = async (id: number) => {
    const response = await api.get<CategoriaModel>('Categorias/GetCategoriaById', {id : id});
    return response.data;
};

export const fetchCategorias = async () => {
    const response = await api.get<CategoriaModel[]>('Categorias/GetAllCategorias');
    return response.data;
};
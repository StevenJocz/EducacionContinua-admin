import { CategoriaModel } from "./Categoria.model";

export const fetchIdCategoria = (id: number) => {
    const data: CategoriaModel = { id: 2, nombre: "Ingeniería" }
    return data;
};

export const fetchCategorias = () => {
    const Data:CategoriaModel[] = [
        { id: 1, nombre: "Humanidades" },
        { id: 2, nombre: "Ingeniería" },
    ];

    return Data;
};
import { ViasModel } from "./Vias.model";

export const fetchId = (id: number) => {
    const data: ViasModel =  { id: 1, nombre: "Calle" }
    return data;
};

export const fetchData = () => {
    const Data:ViasModel[] = [
        { id: 1, nombre: "Calle" },
        { id: 2, nombre: "Carrera" },
        { id: 3, nombre: "Diagonal" },
        { id: 4, nombre: "Transversal" },
        { id: 5, nombre: "Avenida Calle" },
        { id: 6, nombre: "Avenida Carrera" },
        { id: 7, nombre: "Avenida" },
        { id: 8, nombre: "Circular" },
        { id: 9, nombre: "Manzana" },
        { id: 10, nombre: "Urbanización" }
    ];

    return Data;
};
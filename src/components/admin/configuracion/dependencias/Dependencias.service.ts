import { Dependencia } from "./Dependencias.model";

export const fetchIdDependecia = (id: number) => {
    const dependecia: Dependencia = { id: 2, nombre: "Facultad de Ingeniería" }

    return dependecia;
};

export const fetchDependecias = () => {
    const Data:Dependencia[] = [
        { id: 1, nombre: "Facultad de Humanidades" },
        { id: 2, nombre: "Facultad de Ingeniería" },
    ];

    return Data;
};
import { Modulo } from "./Modulos.model";

export const fetchModulo = (id: number) => {
    const modulo: Modulo =
    {
        id: 1,
        titulo: "Análisis de datos en Python con NumPy y Pandas",
        descripcion: "Aprende a procesar, analizar y visualizar datos en Python usando NumPy, Pandas, Matplotlib y Seaborn.",
        activo: true,
    }

    return modulo;
};
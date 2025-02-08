import { Tema } from "./Temas.model";

export const fetchTema = (id: number) => {
    const tema: Tema =
    {
        id: 1,
        idModulo: 1,
        titulo: "Análisis de datos en Python con NumPy y Pandas",
        descripcion: "Aprende a procesar, analizar y visualizar datos en Python usando NumPy, Pandas, Matplotlib y Seaborn.",
        video: "https://www.youtube.com/watch?v=L13CHhZeTYw",
        activo: true,
    }

    return tema;
};
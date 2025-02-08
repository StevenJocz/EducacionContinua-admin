import { InformacionCurso } from "./Informacion.modl";


export const fetchCurso = (id: number)  => {
    const curso: InformacionCurso = 
        {
            id: 8,
            titulo: "Análisis de datos en Python con NumPy y Pandas",
            descripcion: "Aprende a procesar, analizar y visualizar datos en Python usando NumPy, Pandas, Matplotlib y Seaborn.",
            categoria: "3",
            dependencia: "2",
            imagen: "https://edteam-media.s3.amazonaws.com/courses/big/259e30f7-691b-4f91-af97-cd3f5c924761.jpeg",
            aprendera: [
                "Fundamentos esenciales de Numpy y Pandas para análisis de datos.",
                "Creación y manipulación de datos con Numpy Arrays y Pandas DataFrames.",
                "Funciones importantes de la librerías para transformación de datos."
            ]
        }
    return curso;
};
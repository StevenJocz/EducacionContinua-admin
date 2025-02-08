import { RecursosModel } from "./Recursos.model";

export const fetchRecursos = (id: number) => {
    const recursos: RecursosModel[] = [
        {
            id: 1,
            tipo: 1,
            fuente: "https://ed.team/cursos/javascript"
        },
        {
            id: 2,
            tipo: 2,
            fuente: "https://ed.team/cursos/javascript"
        }
    ]
    return recursos;
};
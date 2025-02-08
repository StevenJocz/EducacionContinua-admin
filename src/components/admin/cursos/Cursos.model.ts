export interface ListCurso {
    id: number;
    codigo: string;
    title: string;
    image: string;
    estado: string
    categoria: string
    dependencia: string;
    temario: boolean;
    recursos: boolean;
    grupos: boolean;
    cupones: boolean;
}

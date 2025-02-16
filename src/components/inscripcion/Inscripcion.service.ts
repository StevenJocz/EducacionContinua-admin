import { Cupon, CursoInscripion } from "./Inscripcion.model";

export const fetchCursoID = async (id: number, idVendedor: number): Promise<CursoInscripion[]> => {
    const curso: CursoInscripion[] = [
        {
            id: 39,
            titulo: 'Creación de contenido con IA y realidad aumentada',
            imagen: 'https://edteam-media.s3.amazonaws.com/courses/big/8db261a5-afc4-4da0-a248-42571f5a7003.png',
            instructor: 'Juan Pérez',
            precio: 328000,
            impuesto: 19,
            descuento: 20000,
        },
        {
            id: 40,
            titulo: 'Desarrollo de aplicaciones móviles con Flutter',
            imagen: 'https://edteam-media.s3.amazonaws.com/courses/big/7d810773-b366-4445-b890-f825eaa26cb9.png',
            instructor: 'Jheyson Eduardo Galvis Valencia',
            precio: 1250000,
            impuesto: 19,
            descuento: 300000,
        }
    ];

    return new Promise((resolve) => {
        setTimeout(() => {
            const cursoEncontrado = curso.find(curso => curso.id === id);
            resolve(cursoEncontrado ? [cursoEncontrado] : []);
        }, 100);
    });
};

export const fetchCuponDescuento = async (idCurso: number, codigo: string): Promise<Cupon> => {
    const cupones: Cupon[] = [
        // Cupones para el curso 1
        {
            id: 1,
            idCurso: 1,
            nombre: "Estudiante UNAC",
            codigo: "#EstamosJuntos",
            descuento: 10000,
            valido: true,
            mensaje: "Cupón válido"
        },
        {
            id: 2,
            idCurso: 1,
            nombre: "Empleado UNAC",
            codigo: "BLACKFRIDAY",
            descuento: 25000,
            valido: true,
            mensaje: "Cupón válido"
        },
        {
            id: 3,
            idCurso: 1,
            nombre: "Egresado UNAC",
            codigo: "HSEACDEUNAC",
            descuento: 30000,
            valido: false,
            mensaje: "Cupón válido"
        },
        // Cupones para el curso 2
        {
            id: 4,
            idCurso: 2,
            nombre: "Promoción de lanzamiento",
            codigo: "LANZAMIENTO50",
            descuento: 50000,
            valido: true,
            mensaje: "Cupón válido"
        },
        {
            id: 5,
            idCurso: 2,
            nombre: "Descuento por referidos",
            codigo: "AMIGOS2024",
            descuento: 15000,
            valido: true,
            mensaje: "Cupón válido"
        },
        {
            id: 6,
            idCurso: 2,
            nombre: "Descuento especial",
            codigo: "ESPECIAL20",
            descuento: 20000,
            valido: false,
            mensaje: "Cupón expirado"
        }
    ];

    return new Promise((resolve) => {
        setTimeout(() => {
            const cupon = cupones.find(c => c.idCurso === idCurso && c.codigo === codigo);
            if (cupon) {
                resolve(cupon);
            } else {
                resolve({ id: 0, idCurso, codigo, nombre: "", descuento: 0, valido: false, mensaje: "Cupón no encontrado" });
            }
        }, 1000);
    });
};

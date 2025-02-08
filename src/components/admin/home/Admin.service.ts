import { ObjectWidget } from "./Admin.model";
import { IoBook, IoDocumentText, IoExtensionPuzzle, IoPeopleSharp } from 'react-icons/io5'

export const fetchWidget = () => {
    const Widget: ObjectWidget = {

        inscripciones: [
            {
                id: 1,
                nombre: "Octubre",
                inscripciones: 120
            },
            {
                id: 2,
                nombre: "Noviembre",
                inscripciones: 490
            },
            {
                id: 3,
                nombre: "Diciembre",
                inscripciones: 180
            },
            {
                id: 4,
                nombre: "Enero",
                inscripciones: 130
            },
            {
                id: 5,
                nombre: "Febrero",
                inscripciones: 250
            }
        ],
        cursos: [
            {
                "id": 1,
                "nombre": "Introducción a la Programación",
                "valor": 645
            },
            {
                "id": 2,
                "nombre": "Desarrollo Web con React",
                "valor": 807
            },
            {
                "id": 3,
                "nombre": "Diseño Gráfico Avanzado",
                "valor": 537
            },
            {
                "id": 4,
                "nombre": "Marketing Digital y SEO",
                "valor": 404
            },
            {
                "id": 5,
                "nombre": "Fotografía Digital",
                "valor": 400
            }
        ],
        total: [
            {
                id: 1,
                nombre: "Estudiantes",
                valor: 2400,
                texto: "Total de estudiantes registrados en la plataforma.",
                icono: IoPeopleSharp
            },
            {
                id: 2,
                nombre: "Cursos y eventos",
                valor: 4,
                texto: "Total de cursos y eventos disponibles en la plataforma.",
                icono: IoBook
            },
            {
                id: 3,
                nombre: "Inscripciones",
                valor: 1170,
                texto: "Total de inscripciones activas en la plataforma.",
                icono: IoDocumentText
            },
            {
                id: 4,
                nombre: "Vendedores",
                valor: 5,
                texto: "Total de vendores activos en la plataforma.",
                icono: IoExtensionPuzzle
            }
        ],
        dataInscripciones: [
            {
                id: 1,
                nombre: "Hamilton Espinal",
                fecha: "10 de Febrero de 2025",
                curso: "Introducción a la Programación",
                estado: "Completa",
            },
            {
                id: 2,
                nombre: "Hamilton Espinal",
                fecha: "10 de Febrero de 2025",
                curso: "Desarrollo Web con React",
                estado: "Pendiente",
            },
            {
                id: 3,
                nombre: "Hamilton Espinal",
                fecha: "10 de Febrero de 2025",
                curso: "Diseño Gráfico Avanzado",
                estado: "Cancelada",
            }
        ]
    }


    return Widget
}
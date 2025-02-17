import { InformacionEstudiante } from "./Perfil.model";

export const fetchEstudianteID = (id: number) => {
    const estudiante: InformacionEstudiante[] = [
        {
            id: 11,
            estudiante: {
                id: 1,
                imagen: "https://randomuser.me/api/portraits/men/11.jpg",
                correo: "csebastian.ramirez@email.com",
                apellidos: "Ramírez Ocampo",
                nombres: "Sebastián David",
                tipoDocumento: "CC",
                documento: "100011",
                celular: "3164455667",
                genero: "Masculino",
                pais: "1",
                departamento: "1",
                ciudad: "1",
                tipoVia: "1",
                numero1: "45",
                numero2: "10",
                numero3: "25",
            },
            cursos: [
                {
                    id: 1,
                    imagen: "https://edteam-media.s3.amazonaws.com/courses/original/a548d03b-1b82-4412-b630-8c9841986470.png",
                    titulo: "Educación en la Era Digital",
                    codigo: "CFE202517065421",
                    progreso: 50,
                },
                {
                    id: 2,
                    imagen: "https://edteam-media.s3.amazonaws.com/courses/medium/4754fbff-50b4-414f-8237-5ce2bc5227b1.jpeg",
                    titulo: "Programación en JavaScript",
                    codigo: "CFE202517065422",
                    progreso: 75,
                }
            ],
            certificados: [
                {
                    id: 1,
                    titulo: "Educación en la Era Digital",
                    imagen: "https://edteam-media.s3.amazonaws.com/certificates/original/c132444e-9748-454e-9643-5afea0cfd654.png",
                    urlDescarga: "https://example.com/certificado1.pdf",
                },
                {
                    id: 2,
                    titulo: "Programación en JavaScript",
                    imagen: "https://edteam-media.s3.amazonaws.com/certificates/original/c132444e-9748-454e-9643-5afea0cfd654.png",
                    urlDescarga: "https://example.com/certificado2.pdf",
                }
            ]
        },
        {
            id: 10,
            estudiante: {
                id: 2,
                imagen: "https://randomuser.me/api/portraits/women/10.jpg",
                correo: "valentina.ruiz@email.com",
                apellidos: "Ruiz Zapata",
                nombres: "Valentina Sofía",
                tipoDocumento: "CC",
                documento: "100010",
                celular: "3183344556",
                genero: "Femenino",
                pais: "1",
                departamento: "1",
                ciudad: "1",
                tipoVia: "2",
                numero1: "30",
                numero2: "15",
                numero3: "18",
            },
            cursos: [
                {
                    id: 2,
                    imagen: "https://edteam-media.s3.amazonaws.com/courses/medium/4754fbff-50b4-414f-8237-5ce2bc5227b1.jpeg",
                    titulo: "Programación en JavaScript",
                    codigo: "CFE202517065751",
                    progreso: 75,
                }
            ],
            certificados: [
                {
                    id: 2,
                    titulo: "Programación en JavaScript",
                    imagen: "https://edteam-media.s3.amazonaws.com/certificates/original/c132444e-9748-454e-9643-5afea0cfd654.png",
                    urlDescarga: "https://example.com/certificado2.pdf",
                }
            ]
        }
    ]
    const cursoEncontrado = estudiante.find(curso => curso.id === id);
    return cursoEncontrado ? [cursoEncontrado] : [];
};
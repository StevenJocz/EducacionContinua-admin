import { IdProfesorModel, ProfesoresModel } from "./Profesores.model";

export const fetchData = () => {
    const Data: ProfesoresModel[] = [
        { 
            id: 1, 
            foto: 'https://randomuser.me/api/portraits/men/10.jpg', 
            nombres: 'Andrés Felipe', 
            apellidos: 'Rodríguez', 
            documento: '900001', 
            titulo: 'Magíster en Educación',
            estado: true
        },
        { 
            id: 2, 
            foto: 'https://randomuser.me/api/portraits/women/15.jpg', 
            nombres: 'Laura Marcela', 
            apellidos: 'Gómez', 
            documento: '900002', 
            titulo: 'Doctora en Ciencias de la Computación',
            estado: true 
        },
        { 
            id: 3, 
            foto: 'https://randomuser.me/api/portraits/men/20.jpg', 
            nombres: 'Carlos Alberto', 
            apellidos: 'López', 
            documento: '900003', 
            titulo: 'Especialista en Inteligencia Artificial',
            estado: false 
        },
        { 
            id: 4, 
            foto: 'https://randomuser.me/api/portraits/women/25.jpg', 
            nombres: 'Mariana Isabel', 
            apellidos: 'Fernández', 
            documento: '900004', 
            titulo: 'Licenciada en Matemáticas' ,
            estado: true
        }

    ];

    return Data;
};


export const fetchIdProfesor = (id: number) => {
    const data: IdProfesorModel =  {
        id: 2,
        foto: 'https://randomuser.me/api/portraits/women/25.jpg', 
        correo: "valentina.ruiz@email.com",
        apellidos: 'Fernández', 
        nombres: 'Mariana Isabel', 
        tipoDocumento: "CC",
        documento: '900004', 
        celular: "3183344556",
        genero: "Femenino",
        titulo: "Licenciada en Matemáticas",
        descripcion: "Licenciado en Educación y Lengua Inglesa con más de 10 años de experiencia en la enseñanza del inglés. Apasionado por guiar a los estudiantes en su proceso de aprendizaje, ayudándoles a desarrollar habilidades lingüísticas sólidas y a alcanzar sus metas académicas. Su enfoque pedagógico está basado en la comprensión y el crecimiento de cada estudiante..",
        estado: true
    }
    return data;
};
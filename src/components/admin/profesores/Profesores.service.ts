import { ProfesoresModel } from "./Profesores.model";

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
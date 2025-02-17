import { EstudiantesModel } from "./Estudiantes.model";


export const fetchData = () => {
    const Data: EstudiantesModel[] = [
        { 
            id: 1, 
            foto: 'https://randomuser.me/api/portraits/men/1.jpg', 
            documento: '100001',
            nombres: 'Carlos Andrés', 
            apellidos: 'Gómez Ramírez', 
            correo: 'carlos.gomez@email.com',
            telefono: '3101234567',
        },
        { 
            id: 2, 
            foto: 'https://randomuser.me/api/portraits/women/2.jpg', 
            documento: '100002',
            nombres: 'María Fernanda', 
            apellidos: 'López Fernández', 
            correo: 'maria.lopez@email.com',
            telefono: '3209876543',
        },
        { 
            id: 3,
            foto: '',
            documento: '100003', 
            nombres: 'Juan Sebastián', 
            apellidos: 'Martínez Castro', 
            correo: 'juan.martinez@email.com',
            telefono: '3112233445',
        },
        { 
            id: 4, 
            foto: '',
            documento: '100004',
            nombres: 'Ana Victoria', 
            apellidos: 'Hernández Torres', 
            correo: 'ana.hernandez@email.com',
            telefono: '3155566778',
        },
        { 
            id: 5, 
            foto: 'https://randomuser.me/api/portraits/men/5.jpg',
            documento: '100005',
            nombres: 'Luis Eduardo', 
            apellidos: 'Pérez Molina', 
            correo: 'luis.perez@email.com',
            telefono: '3121122334',
        },
        { 
            id: 6, 
            foto: 'https://randomuser.me/api/portraits/women/6.jpg', 
            documento: '100006',
            nombres: 'Diana Carolina', 
            apellidos: 'Ortiz Velásquez', 
            correo: 'diana.ortiz@email.com',
            telefono: '3146677889',
        },
        { 
            id: 7, 
            foto: 'https://randomuser.me/api/portraits/men/7.jpg', 
            documento: '100007',
            nombres: 'Jorge Alejandro', 
            apellidos: 'Castaño Ríos', 
            correo: 'jorge.castano@email.com',
            telefono: '3199988776',
        },
        { 
            id: 8, 
            foto: 'https://randomuser.me/api/portraits/women/8.jpg', 
            documento: '100008',
            nombres: 'Paula Andrea', 
            apellidos: 'Mejía Giraldo', 
            correo: 'paula.mejia@email.com',
            telefono: '3171122334',
        },
        { 
            id: 9, 
            foto: 'https://randomuser.me/api/portraits/men/9.jpg', 
            documento: '100009',
            nombres: 'Felipe Esteban', 
            apellidos: 'González Betancur', 
            correo: 'felipe.gonzalez@email.com',
            telefono: '3132233445',
        },
        { 
            id: 10, 
            foto: 'https://randomuser.me/api/portraits/women/10.jpg', 
            documento: '100010',
            nombres: 'Valentina Sofía', 
            apellidos: 'Ruiz Zapata', 
            correo: 'valentina.ruiz@email.com',
            telefono: '3183344556',
        },
        { 
            id: 11, 
            foto: 'https://randomuser.me/api/portraits/men/11.jpg', 
            documento: '100011',
            nombres: 'Sebastián David', 
            apellidos: 'Ramírez Ocampo', 
            correo: 'sebastian.ramirez@email.com',
            telefono: '3164455667',
        }

    ];

    return Data;
};
import { VendedorModel } from "./Vendedores.model";

export const fetchData = () => {
    const Data: VendedorModel[] = [
        { 
            id: 1, 
            nombres: 'Andrés Felipe', 
            apellidos: 'Rodríguez', 
            documento: '900001', 
            correo: 'andres.rodriguez@example.com',
            estado: true
        },
        { 
            id: 2, 
            nombres: 'María Fernanda', 
            apellidos: 'Gómez', 
            documento: '900002', 
            correo: 'maria.gomez@example.com',
            estado: false
        },
        { 
            id: 3, 
            nombres: 'Juan Carlos', 
            apellidos: 'López', 
            documento: '900003', 
            correo: 'juan.lopez@example.com',
            estado: true
        },
        { 
            id: 4, 
            nombres: 'Camila Andrea', 
            apellidos: 'Torres', 
            documento: '900004', 
            correo: 'camila.torres@example.com',
            estado: true
        },
        { 
            id: 5, 
            nombres: 'Ricardo', 
            apellidos: 'Pérez', 
            documento: '900005', 
            correo: 'ricardo.perez@example.com',
            estado: false
        },

    ];

    return Data;
};

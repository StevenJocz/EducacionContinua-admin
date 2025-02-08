import api from "@/service/Api.service";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";


const loginHandler = async (credentials: any) => {
    try {
        const response = await api.get<any>('Login/GetAutenticar', credentials);

        if (response.data.result == true) {
            // Decodificar el token para obtener la fecha de expiración
            const decodedToken: any = jwtDecode(response.data.token);
            const expirationDate = new Date(decodedToken.exp * 1000); // Convertir de segundos a milisegundos

            // Guardar el token en una cookie con la fecha de expiración
            Cookies.set('gresptes', response.data.token, { expires: expirationDate, path: '/' });
        }

        return response;
    } catch (error) {
        console.error('Error al autenticar', error);
        throw error;
    }
};

export default loginHandler;

"use client"
import { useState } from 'react';
import Button from '../../button/Buttton';
import { IoEye, IoEyeOff, IoAlertCircleOutline } from "react-icons/io5";
import loginHandler from './Inicio.service';
import {useRouter} from 'next/navigation';

const Formulario = () => {
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [credentials, setCredentials] = useState({
        correo: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        correo: '',
        password: ''
    });
    const [respuesta, setRespuesta] = useState('');

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { correo: '', password: '', response: '' };

        // Validar correo
        if (!credentials.correo) {
            newErrors.correo = 'El correo es obligatorio.';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.correo)) {
            newErrors.correo = 'Por favor, ingresa un correo válido.';
            valid = false;
        }

        // Validar contraseña
        if (!credentials.password) {
            newErrors.password = 'La contraseña es obligatoria.';
            valid = false;
        } else if (credentials.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setRespuesta('');
        e.preventDefault();
        if (!validateForm()) return; // Si no es válido, no enviar.
        const response = await loginHandler(credentials);
        if (response.data.result == true) {
            router.replace('/dashboard');
        } else {
            setRespuesta(response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='Formulario_Input'>
                <label htmlFor="correo">Correo electrónico</label>
                <input
                    name="correo"
                    type="email"
                    placeholder="Correo electrónico"
                    value={credentials.correo}
                    onChange={handleChange}
                />
                {errors.correo && <p className="Formulario_Input_Error"><IoAlertCircleOutline />{errors.correo}</p>}
            </div>
            <div className='Formulario_Input'>
                <label htmlFor="password">Contraseña</label>
                <input
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Contraseña"
                    value={credentials.password}
                    onChange={handleChange}
                />
                {isPasswordVisible ? (
                    <IoEye
                        className='Icono'
                        onClick={togglePasswordVisibility}
                    />
                ) : (
                    <IoEyeOff
                        className='Icono'
                        onClick={togglePasswordVisibility}
                    />
                )}
                {errors.password && <p className="Formulario_Input_Error"><IoAlertCircleOutline />{errors.password}</p>}
                {respuesta && <p className="Formulario_Input_Error_Login">{respuesta}</p>}
            </div>

            <Button type={1} text='Iniciar sesión' />
        </form>
    );
};

export default Formulario;

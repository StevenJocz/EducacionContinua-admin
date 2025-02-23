import { Alert, Snackbar } from '@mui/material'
import React from 'react'

interface Props {
    id: number;
    open: boolean;
    onClose: () => void;
}

export const Alerta: React.FC<Props> = ({ id, onClose, open }) => {
    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return; // Evita cerrar si el usuario hace clic fuera
        onClose(); // Cierra la alerta automáticamente después del tiempo definido
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {id > 0 ? '¡Actualización exitosa!' : '¡Guardado exitosamente!'}
            </Alert>
        </Snackbar>
    )
}

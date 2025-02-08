import { styled, TextField, TextareaAutosize } from '@mui/material';

export const StyledTextField = styled(TextField)({
    width: '100%',
    background: '#fff',
    marginBottom: '20px',
    borderRadius: '5px',

    '& .MuiInputBase-input': {
        fontSize: '18px',
        fontFamily: 'Barlow Condensed, sans-serif',
    },

    '& .MuiInputLabel-root': {
        fontSize: '18px',
        color: '#16423C',
        transition: 'all 0.3s ease',
        fontFamily: 'Barlow Condensed, sans-serif',
    },

    '& .MuiInputLabel-root.Mui-focused': {
        color: '#8b99ab',
        transform: 'translateY(-28px)',
    },

    '& .MuiInputLabel-root.MuiFormLabel-filled': {
        transform: 'translateY(-28px)', // Mueve el label hacia arriba cuando el campo tiene valor
        color: '#8b99ab',
    },
});

export const StyledTextArea = styled(TextareaAutosize)({
    width: '100%',
    background: '#fff',
    marginBottom: '20px',
    fontFamily: "Barlow Condensed, sans-serif", // Asegura que sea heredado
    borderRadius: '5px',
    padding: '10px',
    border: '1px solid #ccc',
    fontSize: '18px',
    outline: 'none',
    transition: 'all 0.3s ease',

    '&:focus': {
        borderColor: '#8b99ab', // Color del borde cuando está enfocado
        boxShadow: '0 0 5px rgba(139, 153, 171, 0.5)',
    }
});

export const StyledSelect = styled(TextField)({
    width: '100%',
    background: '#fff',
    borderRadius: '5px',
    marginBottom: '20px',
    '& .MuiInputBase-input': {
        fontFamily: 'Barlow Condensed, sans-serif', 
    },

    '& .MuiInputLabel-root': {
        color: '#16423C',
        transition: 'all 0.3s ease',
        fontFamily: 'Barlow Condensed, sans-serif', 
    },

    '& .MuiInputLabel-root.Mui-focused': {
        color: '#8b99ab', 
        transform: 'translateY(-25px)',
    },

    '& .MuiInputLabel-root.MuiFormLabel-filled': {
        transform: 'translateY(-25px)', // Mueve el label hacia arriba cuando el campo tiene valor
        color: '#8b99ab',
    },
});

import { DatePicker } from '@mui/x-date-pickers';

export const StyledDatePicker = styled(DatePicker)({
    width: '100%',
    background: '#fff',
    marginBottom: '20px',
    borderRadius: '5px',

    '& .MuiInputBase-input': {
        fontSize: '18px',
        fontFamily: 'Barlow Condensed, sans-serif',
    },

    '& .MuiInputLabel-root': {
        fontSize: '18px',
        color: '#16423C',
        transition: 'all 0.3s ease',
        fontFamily: 'Barlow Condensed, sans-serif',
    },

    '& .MuiInputLabel-root.Mui-focused': {
        color: '#8b99ab',
        transform: 'translateY(-28px)',
    },

    '& .MuiInputLabel-root.MuiFormLabel-filled': {
        transform: 'translateY(-28px)',
        color: '#8b99ab',
    },
});


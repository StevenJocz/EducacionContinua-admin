// Función para formatear el número como moneda
export const formatPrice = (value: string) => {
    // Elimina caracteres no numéricos
    const cleanedValue = value.replace(/[^\d]/g, '');
    // Formatea el número con separadores de miles y decimales
    if (cleanedValue) {
        const formattedValue = Number(cleanedValue).toLocaleString('es-CO', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
        return formattedValue;
    }
    return '';
};
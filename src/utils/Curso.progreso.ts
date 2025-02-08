interface Contenido {
  id: number;
  aprobado: boolean;
  tiempo: number;
}

const calcularProgreso = (
  contenido: Contenido,
  cursoId: number,
  moduloId: number,
  scrollPercentage: number,
  actualizarProgreso: (cursoId: number, moduloId: number, contenidoId: number,quizId: number, calificacion: number) => void
): Promise<boolean> => {
  return new Promise((resolve) => {
    // Variables iniciales
    let aprobado = contenido.aprobado;
    let scrollAlcanzado = false;
    let conteoAutomatico = 0;

    // Validar el scroll
    const validScrollPercentage = isNaN(scrollPercentage)  || scrollPercentage === 0 ? 100 : scrollPercentage;
    if (validScrollPercentage >= 80) {
      scrollAlcanzado = true;
    }

    // Iniciar conteo automático
    const intervalo = setInterval(() => {
      conteoAutomatico++;

      // Verificar condiciones de aprobación
      if (conteoAutomatico >= contenido.tiempo && scrollAlcanzado && !aprobado) {
        aprobado = true;
        actualizarProgreso(cursoId, moduloId, contenido.id, 0, 0);

        // Detener el intervalo y resolver la promesa
        clearInterval(intervalo);
        resolve(true);
      }
    }, 1000);

    // Si ya está aprobado, resolver inmediatamente
    if (aprobado) {
      clearInterval(intervalo);
      resolve(true);
    }
  });
};

export default calcularProgreso;

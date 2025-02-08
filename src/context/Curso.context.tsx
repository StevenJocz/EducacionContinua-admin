import { ObjectoCurso } from '@/components/cursos/cursoView/Curso.model';
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define la estructura del contexto para los cursos
interface CursosContextProps {
    cursos: ObjectoCurso[]; // Lista de cursos
    setCursos: (cursos: ObjectoCurso[]) => void; // Función para actualizar la lista de cursos
    actualizarProgreso: (cursoId: number, moduloId: number, temaId: number, quizId: number, calificacion?: number) => void; // Función para actualizar el progreso
}

// Crea el contexto, con un valor predeterminado de 'undefined'
const CursosContext = createContext<CursosContextProps | undefined>(undefined);

// Propiedades del proveedor del contexto (se esperan los hijos del proveedor)
interface CursosProviderProps {
    children: ReactNode;
}

// Componente que provee el contexto a los componentes hijos
export const CursosProvider: React.FC<CursosProviderProps> = ({ children }) => {
    // Estado para almacenar los cursos
    const [cursos, setCursosState] = useState<ObjectoCurso[]>([]);

    // Función para actualizar los cursos
    const setCursos = (cursos: ObjectoCurso[]) => {
        setCursosState(cursos);
    };

    // Función para actualizar el progreso de los cursos, módulos, temas y quizes
    const actualizarProgreso = (cursoId: number, moduloId: number, temaId: number, quizId?: number, calificacion?: number) => {
        setCursosState((prevCursos) => {
            return prevCursos.map((curso) => {
                if (curso.id === cursoId) {
                    // Actualiza los módulos
                    const modulosActualizados = curso.modulos.map((modulo) => {
                        if (modulo.id === moduloId) {
                            // Actualiza los temas
                            const temasActualizados = modulo.temas.map((tema) => {
                                if (tema.id === temaId) {
                                    tema.aprobado = true;
                                }
                                return tema;
                            });
                            modulo.temas = temasActualizados;
    
                            // Verifica si todos los temas están aprobados
                            modulo.aprobado = modulo.temas.every((tema) => tema.aprobado);
    
                            // Actualiza el progreso de los quizes (solo si se ha realizado)
                            const quizzActualizado = modulo.quizz.map((quiz) => {
                                if (quiz.id === quizId) {
                                    quiz.realizado = true;
                                    quiz.calificacion = calificacion || 0;
                                }
                                return quiz;
                            });
                            modulo.quizz = quizzActualizado;
                        }
                        return modulo;
                    });
    
                    // Calcula el progreso de los módulos basándonos en los temas aprobados y los quizes realizados
                    const totalTemas = curso.modulos.reduce((acc, modulo) => acc + modulo.temas.length, 0);
                    const temasAprobados = curso.modulos.reduce((acc, modulo) => acc + modulo.temas.filter((tema) => tema.aprobado).length, 0);
    
                    // Calcula el progreso de cada módulo
                    const progresoModulo = curso.modulos.reduce((acc, modulo) => {
                        const temasAprobadosModulo = modulo.temas.filter((tema) => tema.aprobado).length;
                        const porcentajeTemasModulo = temasAprobadosModulo / modulo.temas.length;
    
                        // Calcula el progreso de los quizes (solo si están realizados)
                        const progresoQuiz = modulo.quizz.every((quiz) => quiz.realizado) ? 1 : 0;
    
                        // Progreso del módulo basado solo en temas aprobados y quizes realizados
                        const progresoModuloTotal = porcentajeTemasModulo * 0.7 + progresoQuiz * 0.3;
                        return acc + progresoModuloTotal * (modulo.temas.length / totalTemas);
                    }, 0);
    
                    // Calcula el progreso total del curso
                    curso.progreso = Math.round(Math.min(100, progresoModulo * 100));
                    if (curso.progreso === 100) {
                        curso.finalizado = true;
                    }
                    curso.modulos = modulosActualizados;
                }
                return curso;
            });
        });
    };
    
    


    // Proporciona el contexto a los componentes hijos
    return (
        <CursosContext.Provider value={{ cursos, setCursos, actualizarProgreso }}>
            {children}
        </CursosContext.Provider>
    );
};

// Hook para usar el contexto de cursos en cualquier componente
export const useCursos = () => {
    const context = useContext(CursosContext);
    if (!context) {
        throw new Error('useCursos debe usarse dentro de un CursosProvider');
    }
    return context;
};

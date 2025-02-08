import { HomeCurso } from "@/components/cursos/cursoView";
import { Nav } from "@/components/nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Educación Continua - Estudiante",
  description: "Descubre tu potencial con MAO Word: el primer paso hacia el dominio del inglés comienza aquí. ¡Inscríbete y transforma tu futuro!",
  icons: {
    icon: ['./favicon.ico'],
    apple: ['./favicon.ico'],
  },
};

const Student = () => {
  const theme: 'dark' | 'light' = 'dark';
  return (
    <div>
      <Nav theme={theme} />
      <HomeCurso />
    </div>
  );
};

export default Student;
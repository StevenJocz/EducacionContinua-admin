import type { Metadata } from "next";
import "../style/globals.css"

export const metadata: Metadata = {
  title: "Educación Continua - Dashboard",
  description: "Descubre tu potencial con MAO Word: el primer paso hacia el dominio del inglés comienza aquí. ¡Inscríbete y transforma tu futuro!",
  icons: {
    icon: ['./favicon.ico'],
    apple: ['./favicon.ico'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

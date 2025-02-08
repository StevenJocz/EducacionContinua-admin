const RUTA_PUBLICA = 'http://localhost:3001';

export  const Routes = {
    LOGIN: {
        path: '/',
        name: 'Login',
    },
    REGISTRO: {
        path: '/user/sign_up',
        name: 'sign_up',
    },
    NEWPASSWORD: {
        path: '/user/password_new',
        name: 'New Password',
    },
    HOME: {
        path: `${RUTA_PUBLICA}`,
        name: 'Home',
    },
    DASHBOARD: {
        path: '/dashboard',
        name: 'Home',
    },
    STUDENT: {
        path: '/dashboard/student',
        name: 'Panel Estudiante',
    },
    ADMIN: {
        path: '/dashboard/admin',
        name: 'Panel Administrador',
    },
    INSTRUCTOR: {
        path: '/dashboard/instructor',
        name: 'Panel Instructor',
    },
    PRODUCTOS: {
        path: `${RUTA_PUBLICA}/paginas/productos`,
        name: 'Productos',
    },
    MAOS: {
        path: `${RUTA_PUBLICA}/paginas/maos`,
        name: "Mao's",
    },
    BLOG: {
        path: `${RUTA_PUBLICA}/paginas/blog`,
        name: 'Blog',
    },
    CONTACTENOS: {
        path: `${RUTA_PUBLICA}/paginas/contáctenos`,
        name: 'Contáctenos',
    },
    PRIVACIDAD: {
        path: `${RUTA_PUBLICA}/paginas/politicaprivacidad`,
        name: 'Política de privacidad',
    },
    TERMINOS: {
        path: `${RUTA_PUBLICA}/paginas/terminoscondiciones`,
        name: 'Términos y condiciones',
    },

}

export interface Route {
    path: string,
    name: string
}
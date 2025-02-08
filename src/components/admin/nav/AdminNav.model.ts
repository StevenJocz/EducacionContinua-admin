import {
    IoBookOutline,
    IoConstructOutline,
    IoHomeOutline,
    IoPersonOutline,
    IoDocumentTextOutline,
    IoBriefcaseOutline,
    IoExtensionPuzzleOutline,
    IoCalendarOutline 
} from 'react-icons/io5';

export const RoutesAdmin: Record<string, Route> = {
    INICIO: {
        path: '/dashboard/admin',
        name: 'Inicio',
        icon: IoHomeOutline
    },
    CURSOS: {
        path: '/dashboard/admin/cursos',
        name: 'Cursos',
        icon: IoBookOutline
    },
    EVENTOS: {
        path: '/dashboard/admin/eventos',
        name: 'Eventos',
        icon: IoCalendarOutline
    },
    USUARIOS: {
        path: '/dashboard/admin/usuarios',
        name: 'Usuarios',
        icon: IoPersonOutline
    },
    INSCRIPCIONES: {
        path: '/dashboard/admin/inscripciones',
        name: 'Inscripciones',
        icon: IoDocumentTextOutline
    },
    VENDEDORES: {
        path: '/dashboard/admin/vendedores',
        name: 'Vendedores',
        icon: IoBriefcaseOutline
    },
    CONVENIOS: {
        path: '/dashboard/admin/convenios',
        name: 'Convenios',
        icon: IoExtensionPuzzleOutline
    },
    CONFIGURACION: {
        path: '/dashboard/admin/configuracion',
        name: 'Configuración',
        icon: IoConstructOutline
    }
};

export interface Route {
    path: string;
    name: string;
    icon: React.ElementType;
}

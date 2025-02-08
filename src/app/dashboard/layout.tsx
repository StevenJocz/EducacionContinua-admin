import { Nav } from '@/components/nav';
import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => (
    <div >
        <main>
            {children}
        </main>
    </div>
);

export default DashboardLayout;
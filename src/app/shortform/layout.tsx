import { DesktopHeader, MobileHeader } from '@/components/Layout/Header';

export default function ShortformLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='h-screen overflow-hidden'>
            <MobileHeader />
            <DesktopHeader />
            {children}
        </div>
    );
}

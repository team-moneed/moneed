import { DesktopHeader, MobileHeader } from '@/components/Layout/Header';

export default function ShortformLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MobileHeader />
            <DesktopHeader />
            {children}
        </>
    );
}

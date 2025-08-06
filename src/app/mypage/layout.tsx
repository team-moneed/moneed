import { DesktopHeader, MobileHeader } from '@/components/Layout/Header';

export default function MypageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MobileHeader />
            <DesktopHeader />
            {children}
        </>
    );
}

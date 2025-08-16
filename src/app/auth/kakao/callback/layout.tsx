import { Suspense } from 'react';

export default function KakaoCallbackLayout({ children }: { children: React.ReactNode }) {
    return <Suspense>{children}</Suspense>;
}

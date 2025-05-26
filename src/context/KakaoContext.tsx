'use client';
import { KakaoStatic } from '@/types/kakao';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const KakaoContext = createContext<{ Kakao: KakaoStatic | null }>({ Kakao: null });

export const KakaoProvider = ({ children }: { children: React.ReactNode }) => {
    const [kakao, setKakao] = useState<KakaoStatic | null>(null);

    useEffect(() => {
        const initializeKakao = () => {
            if (typeof window !== 'undefined' && window.Kakao) {
                const { Kakao } = window;
                try {
                    if (!Kakao.isInitialized()) {
                        const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
                        if (!appKey) {
                            console.error('NEXT_PUBLIC_KAKAO_APP_KEY is not defined');
                            return;
                        }

                        Kakao.init(appKey);
                        console.log('✅ Kakao SDK initialized successfully');
                    }

                    setKakao(Kakao);
                } catch (error) {
                    console.error('❌ Kakao SDK initialization failed:', error);
                }
            } else {
                setTimeout(initializeKakao);
            }
        };

        initializeKakao();
    }, []);

    return <KakaoContext.Provider value={useMemo(() => ({ Kakao: kakao }), [kakao])}>{children}</KakaoContext.Provider>;
};

export const useKakao = () => {
    const context = useContext(KakaoContext);
    if (!context) {
        throw new Error('useKakao must be used within a KakaoProvider');
    }
    return context;
};

export default KakaoContext;

import { getKakaoToken } from '@/api/auth/auth.api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');
        // const state = searchParams.get('state');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        // 1. 에러 처리
        if (error) {
            console.error('Kakao OAuth error:', `[${error}] ${errorDescription}`);
            return NextResponse.redirect(
                new URL(
                    `/auth/error?error=${error}&description=${encodeURIComponent(errorDescription || '')}`,
                    request.url,
                ),
            );
        }

        // 2. Authorization code 검증
        if (!code) {
            return NextResponse.redirect(new URL('/auth/error?error=missing_code', request.url));
        }

        // 3. Access Token 요청
        const tokenResponse = await getKakaoToken(code);

        console.log('🔑 tokenResponse', tokenResponse);

        return NextResponse.redirect(new URL('/', request.url));
    } catch (error) {
        console.error('OAuth callback error:', error);
        return NextResponse.redirect(new URL('/auth/error?error=internal_error', request.url));
    }
}

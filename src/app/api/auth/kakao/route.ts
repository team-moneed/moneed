import { getKakaoToken, getKakaoUserInfo } from '@/api/server/kakao.api';
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { TokenPayload } from '@/types/auth';
import { createToken } from '@/lib/session';
import { JWTExpired } from 'jose/errors';
import { TOKEN_ERROR } from '@/constants/token';

export async function POST(request: NextRequest) {
    try {
        const { code, state, error, error_description: errorDescription } = await request.json();

        // CSRF 공격 방지를 위한 state 검증
        if (!state || state !== process.env.KAKAO_STATE_TOKEN) {
            console.error('Invalid state token:', state);
            return NextResponse.redirect(new URL('/auth/error?error=invalid_state', request.url));
        }

        // 1. 에러 처리
        if (error) {
            console.error('Kakao OAuth error:', `[${error}] ${errorDescription}`);
            return NextResponse.redirect(
                new URL(`/auth/error?error=${error}&description=${errorDescription || ''}`, request.url),
            );
        }

        // 2. Authorization code 검증
        if (!code) {
            return NextResponse.redirect(new URL('/auth/error?error=missing_code', request.url));
        }

        // 3. Access Token 요청 및 사용자 정보 조회
        const tokenResponse = await getKakaoToken(code);

        const { access_token: kakaoAccessToken, refresh_token: kakaoRefreshToken } = tokenResponse;
        const kakaoUserInfo = await getKakaoUserInfo(kakaoAccessToken);

        const authService = new AuthService();

        // 4. 기존 회원 여부 확인 및 등록
        const user = await authService.handleKakaoAuth(kakaoUserInfo, {
            accessToken: kakaoAccessToken,
            refreshToken: kakaoRefreshToken,
        });

        // 5. 토큰 발급
        const { accessToken, refreshToken } = await createToken<TokenPayload>({
            id: user.id,
            nickname: user.nickname,
            profileImage: user.profileImage,
        });

        const response = NextResponse.json({ accessToken }, { status: 200 });

        response.cookies.set('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60, // 30일
            path: '/',
        });

        return response;
    } catch (error) {
        if (error instanceof JWTExpired) {
            return NextResponse.json({ error: TOKEN_ERROR.EXPIRED_TOKEN }, { status: 401 });
        }
        console.error('OAuth callback error:', error);
        return NextResponse.redirect(new URL('/auth/error?error=internal_error', request.url));
    }
}

import { getKakaoToken, getKakaoUserInfo } from '@/api/kakao.api';
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { TokenPayload } from '@/types/auth';
import { createToken } from '@/lib/session';
import { JWTExpired } from 'jose/errors';
import { TOKEN_ERROR } from '@/constants/token';
import { AxiosError } from 'axios';

export async function POST(request: NextRequest) {
    try {
        const { code, state } = await request.json();

        // CSRF 공격 방지를 위한 state 검증
        if (!state || state !== process.env.KAKAO_STATE_TOKEN) {
            console.error('Invalid state token:', state);
            return NextResponse.redirect(new URL('/auth/error?error=invalid_state', request.url));
        }

        // Authorization code 검증
        if (!code) {
            return NextResponse.redirect(new URL('/auth/error?error=missing_code', request.url));
        }

        // Access Token 요청 및 사용자 정보 조회
        const { access_token: kakaoAccessToken, refresh_token: kakaoRefreshToken } = await getKakaoToken(code);
        const kakaoUserInfo = await getKakaoUserInfo(kakaoAccessToken);

        const authService = new AuthService();

        // 기존 회원 여부 확인 및 등록
        const { user, isExistingUser } = await authService.signInOrSignUpWithKakao(kakaoUserInfo, {
            accessToken: kakaoAccessToken,
            refreshToken: kakaoRefreshToken,
        });

        // 서비스 자체 토큰 발급
        const { accessToken, refreshToken } = await createToken<TokenPayload>({
            id: user.id,
            nickname: user.nickname,
            profileImage: user.profileImage,
        });

        const response = NextResponse.json({ isExistingUser }, { status: 200 });

        response.cookies.set('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60, // 30일
            path: '/',
        });

        response.cookies.set('access_token', accessToken, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7일
            path: '/',
        });

        return response;
    } catch (error) {
        if (error instanceof JWTExpired) {
            return NextResponse.json({ error: TOKEN_ERROR.EXPIRED_TOKEN }, { status: 401 });
        }
        console.error('OAuth callback error:', (error as AxiosError).response?.data);
        // TODO: 에러 경로 상수화 필요
        return NextResponse.redirect(new URL('/auth/error?error=internal_error', request.url));
    }
}

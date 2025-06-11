import { getKakaoToken, getKakaoUserInfo } from '@/api/kakao.api';
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { JWTExpired } from 'jose/errors';
import { TOKEN_ERROR } from '@/constants/token';
import { AxiosError } from 'axios';
import { createSession } from '@/lib/session';

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
        const kakaoToken = await getKakaoToken(code);
        const {
            access_token: kakaoAccessToken,
            refresh_token: kakaoRefreshToken,
            expires_in: kakaoAccessTokenExpiresInSec,
            refresh_token_expires_in: kakaoRefreshTokenExpiresInSec,
        } = kakaoToken;
        const kakaoUserInfo = await getKakaoUserInfo(kakaoAccessToken);

        const authService = new AuthService();

        // 기존 회원 여부 확인 및 등록
        const { user, isExistingUser } = await authService.signInOrSignUpWithKakao(kakaoUserInfo, {
            accessToken: kakaoAccessToken,
            refreshToken: kakaoRefreshToken,
            accessTokenExpiresIn: new Date(Date.now() + kakaoAccessTokenExpiresInSec * 1000),
            refreshTokenExpiresIn: new Date(Date.now() + kakaoRefreshTokenExpiresInSec * 1000),
        });

        const response = NextResponse.json({ isExistingUser }, { status: 200 });

        await createSession(user.id);

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

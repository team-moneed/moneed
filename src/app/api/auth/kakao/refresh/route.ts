import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { TOKEN_ERROR } from '@/constants/token';
import { cookies } from 'next/headers';
import { JWTExpired } from 'jose/errors';

export async function POST() {
    try {
        const refreshToken = (await cookies()).get('refresh_token')?.value;

        if (!refreshToken) {
            throw new Error(TOKEN_ERROR.INVALID_TOKEN);
        }

        const authService = new AuthService();
        const { accessToken, refreshToken: newRefreshToken } = await authService.refreshToken(refreshToken);

        const response = NextResponse.json({ accessToken }, { status: 200 });

        // 새로운 리프레시 토큰을 쿠키에 설정
        response.cookies.set('refresh_token', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60, // 30일
            path: '/',
        });

        return response;
    } catch (error) {
        const e = error as Error;
        if (e instanceof JWTExpired) {
            return NextResponse.json({ error: TOKEN_ERROR.EXPIRED_TOKEN }, { status: 401 });
        }
        switch (e.message) {
            case TOKEN_ERROR.INVALID_TOKEN:
                return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
            case TOKEN_ERROR.USER_NOT_FOUND:
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            default:
                console.error('Token refresh error:', error);
                return NextResponse.json({ error: 'Failed to refresh token' }, { status: 500 });
        }
    }
}

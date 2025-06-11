import { TOKEN_ERROR } from '@/constants/token';
import { getSession } from '@/lib/session';
import { AuthService } from '@/services/auth.service';
import { JWTExpired } from 'jose/errors';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ message: '로그아웃 성공' }, { status: 200 });
        }

        const authService = new AuthService();
        await authService.logoutWithKakao(session.userId);
        return NextResponse.json({ message: '로그아웃 성공' }, { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof JWTExpired) {
            return NextResponse.json({ message: TOKEN_ERROR.EXPIRED_TOKEN }, { status: 401 });
        }
        return NextResponse.json({ message: '로그아웃 실패' }, { status: 500 });
    }
}

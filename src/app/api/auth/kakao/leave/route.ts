import { getSession } from '@/lib/session';
import { AuthService } from '@/services/auth.service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { reason } = await request.json();

    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const authService = new AuthService();
        const result = await authService.leaveWithKakao({ userId: session.userId, reason });

        if (result.ok) {
            return NextResponse.json({ ok: true });
        }

        return NextResponse.json({ ok: false, reason: result.reason }, { status: 400 });
    } catch (error) {
        console.error('Leave API error:', error);
        return NextResponse.json({ ok: false, reason: 'Internal server error' }, { status: 500 });
    }
}

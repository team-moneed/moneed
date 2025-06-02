import { TOKEN_ERROR } from '@/constants/token';
import { verifySession } from '@/lib/dal';
import prisma from '@/lib/prisma';
import { JWTExpired } from 'jose/errors';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get('authorization')?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = await verifySession(token);
        const selectedStock = await prisma.selectedStock.findMany({
            where: {
                userId: payload.id,
            },
            select: {
                stockId: true,
            },
        });
        return NextResponse.json(selectedStock);
    } catch (error) {
        if (error instanceof JWTExpired) {
            return NextResponse.json({ error: TOKEN_ERROR.EXPIRED_TOKEN }, { status: 401 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

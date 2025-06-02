import { TOKEN_ERROR } from '@/constants/token';
import { verifySession } from '@/lib/dal';
import prisma from '@/lib/prisma';
import { JWTExpired } from 'jose/errors';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get('authorization')?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ error: TOKEN_ERROR.NOT_FOUND_TOKEN }, { status: 401 });
        }
        const payload = await verifySession(token);
        const { stockIds } = await req.json();
        await prisma.selectedStock.createMany({
            data: stockIds.map((stockId: number) => ({
                userId: payload.id,
                stockId,
            })),
            skipDuplicates: true,
        });
    } catch (error) {
        if (error instanceof JWTExpired) {
            return NextResponse.json({ error: TOKEN_ERROR.EXPIRED_TOKEN }, { status: 401 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

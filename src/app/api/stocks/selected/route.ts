import { verifySession } from '@/lib/dal';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
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
}

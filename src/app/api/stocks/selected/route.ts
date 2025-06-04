import { TOKEN_ERROR } from '@/constants/token';
import { verifySession } from '@/lib/dal';
import { StockService } from '@/services/stock.service';
import { JWTExpired } from 'jose/errors';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const token = (await cookies()).get('access_token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = await verifySession(token);
        const stockService = new StockService();
        const selectedStocks = await stockService.getSelectedStock(payload.id);

        return NextResponse.json(selectedStocks);
    } catch (error) {
        if (error instanceof JWTExpired) {
            return NextResponse.json({ error: TOKEN_ERROR.EXPIRED_TOKEN }, { status: 401 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
